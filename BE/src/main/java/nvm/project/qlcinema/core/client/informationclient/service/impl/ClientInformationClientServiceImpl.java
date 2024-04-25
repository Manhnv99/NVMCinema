package nvm.project.qlcinema.core.client.informationclient.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.informationclient.model.request.ClientInformationClientTransactionHistoryRequest;
import nvm.project.qlcinema.core.client.informationclient.model.request.ClientInformationClientPutClientRequest;
import nvm.project.qlcinema.core.client.informationclient.model.response.ClientInformationClientTransactionHistoryResponse;
import nvm.project.qlcinema.core.client.informationclient.repository.ClientInformationClientRepository;
import nvm.project.qlcinema.core.client.informationclient.service.ClientInformationClientService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.Client;
import nvm.project.qlcinema.infrastructure.config.cloudinary.CloudinaryConfig;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import nvm.project.qlcinema.utils.ValidUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClientInformationClientServiceImpl implements ClientInformationClientService {

    private final ClientInformationClientRepository clientInformationClientRepository;

    private final CloudinaryConfig cloudinaryConfig;

    private final ValidUtils validUtils;

    @Override
    public ResponseObject getInformationClientDetail(String id) {
        try {
            return new ResponseObject(clientInformationClientRepository.getInformationClientDetail(id));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được người dùng này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject putClientInformation(ClientInformationClientPutClientRequest putClientRequest) throws IOException {
        List<String> errors = new ArrayList<>();

        if(validUtils.isPhoneValid(putClientRequest.getPhone())){
            errors.add("Số điện thoại không đúng định dạng!");
        }
        if(validUtils.isValidEmail(putClientRequest.getEmail())){
            errors.add("Email không đúng định dạng!");
        }
        //throw Erros
        if(!errors.isEmpty()){
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }

        //check isExist
        Optional<Client> clientOptional = clientInformationClientRepository.findById(putClientRequest.getId());
        if(!putClientRequest.getPhone().equals(clientOptional.get().getPhoneNumber())){
            Optional<Client> isPhoneExist = clientInformationClientRepository.findClientByPhone(putClientRequest.getPhone());
            if(isPhoneExist.isPresent()){
                errors.add("Đã tồn tại số điện thoại này!");
            }
        }
        if(!putClientRequest.getEmail().equals(clientOptional.get().getEmail())){
            Optional<Client> isEmailExist = clientInformationClientRepository.findClientByEmail(putClientRequest.getEmail());
            if(isEmailExist.isPresent()){
                errors.add("Đã tồn tại email này!");
            }
        }
        //throw Erros
        if(!errors.isEmpty()){
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }

        Client putClient = clientOptional.get();
        putClient.setName(putClientRequest.getName());
        putClient.setEmail(putClientRequest.getEmail());
        putClient.setPhoneNumber(putClientRequest.getPhone());
        putClient.setBirthDay(putClientRequest.getBirthDay());
        putClient.setProvince(putClientRequest.getProvince());
        putClient.setAddressDetail(putClientRequest.getAddress());
        putClient.setPassword(putClientRequest.getPassword());
        if(!putClientRequest.getImage().isEmpty()){
            cloudinaryConfig.delete(putClient.getImageId());
            var result=cloudinaryConfig.upload(putClientRequest.getImage());//upload image to cloudinary
            putClient.setImageId((String) result.get("public_id"));
            putClient.setImageUrl((String) result.get("url"));
        }
        clientInformationClientRepository.save(putClient);

        return new ResponseObject("Cập nhật thông tin tài khoản thành công!");
    }

    @Override
    public PageableObject<ClientInformationClientTransactionHistoryResponse> getInformationClientTransactionHistory(ClientInformationClientTransactionHistoryRequest request) {
        try {
            PageRequest pageRequest = PageRequest.of(request.getPage() - 1 , request.getSize());
            return new PageableObject<>(clientInformationClientRepository.getInformationClientTransactionHistory(pageRequest,request.getClientId(),request.getDateFind()));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách lịch sử giao dịch!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

}
