package nvm.project.qlcinema.core.admin.directormanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.directormanagement.model.request.AdminDirectorManagementListDirectorRequest;
import nvm.project.qlcinema.core.admin.directormanagement.model.request.AdminDirectorManagementPostDirectorRequest;
import nvm.project.qlcinema.core.admin.directormanagement.model.request.AdminDirectorManagementPutDirectorRequest;
import nvm.project.qlcinema.core.admin.directormanagement.model.response.AdminDirectorManagementListDirectorResponse;
import nvm.project.qlcinema.core.admin.directormanagement.repository.AdminDirectorManagementRepository;
import nvm.project.qlcinema.core.admin.directormanagement.service.AdminDirectorManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.Director;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminDirectorManagementServiceImpl implements AdminDirectorManagementService {

    private final AdminDirectorManagementRepository adminDirectorManagementRepository;

    @Override
    public PageableObject<AdminDirectorManagementListDirectorResponse> getListDirector(AdminDirectorManagementListDirectorRequest request) {
        try {
            PageRequest pageRequest = PageRequest.of(request.getPage()-1, request.getSize());
            return new PageableObject<>(adminDirectorManagementRepository.getListDirector(pageRequest,request));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách đạo diễn!");
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getDetailDirector(String directorId) {
        try {
            return new ResponseObject(adminDirectorManagementRepository.getDetailDirector(directorId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được đạo diễn này!");
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject postDirector(AdminDirectorManagementPostDirectorRequest postRequest) {
        List<String> errors = new ArrayList<>();

        //check exist
        Optional<Director> isDirectorExist = adminDirectorManagementRepository.isDirectorExist(postRequest);
        if(isDirectorExist.isPresent()){
            errors.add("Đã tồn tại đạo diễn này!");
            throw new RestApiException(errors, HttpStatus.CONFLICT);
        }

        //post Director
        Optional<Director> getNewest = adminDirectorManagementRepository.getNewest();
        Director postDirector = new Director();
        if(getNewest.isPresent()){
            String code = getNewest.get().getCode();
            postDirector.setCode(code.substring(0,2)+((Integer.parseInt(code.substring(2)))+1));
        }else{
            postDirector.setCode("DG1");
        }
        postDirector.setName(postRequest.getName());
        postDirector.setGender(postRequest.isGender());
        postDirector.setAge(postRequest.getAge());
        postDirector.setDescription(postRequest.getDescription());
        postDirector.setDeleted(true);
        postDirector.setCreatedAt(new Date());
        adminDirectorManagementRepository.save(postDirector);

        return new ResponseObject("Thêm mới đạo diễn thành công!");
    }

    @Override
    public ResponseObject putDirector(AdminDirectorManagementPutDirectorRequest putRequest) {
        List<String> errors = new ArrayList<>();

        //check exist
        Optional<Director> directorOptional = adminDirectorManagementRepository.findById(putRequest.getDirectorId());
        if(directorOptional.isEmpty()){
            errors.add("Không tìm thấy đạo diễn này!");
            throw new RestApiException(errors,HttpStatus.NOT_FOUND);
        }else{
            if(!directorOptional.get().getName().equals(putRequest.getName()) ||
                    directorOptional.get().isGender() != (putRequest.isGender()) ||
                    directorOptional.get().getAge() != (putRequest.getAge()) ||
                    !directorOptional.get().getDescription().equals(putRequest.getDescription()) ){
                Optional<Director> isDirectorExist = adminDirectorManagementRepository.isDirectorExist(putRequest);
                if(isDirectorExist.isPresent()){
                    errors.add("Đã tồn tại đạo diễn này!");
                    throw new RestApiException(errors, HttpStatus.CONFLICT);
                }
            }
        }

        //post Director
        Director putDirector = directorOptional.get();
        putDirector.setName(putRequest.getName());
        putDirector.setGender(putRequest.isGender());
        putDirector.setAge(putRequest.getAge());
        putDirector.setDescription(putRequest.getDescription());
        adminDirectorManagementRepository.save(putDirector);

        return new ResponseObject("Cập nhật đạo diễn thành công!");
    }

    @Override
    public ResponseObject deleteDirector(String directorId) {
        try {
            Optional<Director> directorOptional = adminDirectorManagementRepository.findById(directorId);
            if(directorOptional.isEmpty()){
                throw new Exception();
            }else{
                Director deleteDirector = directorOptional.get();
                deleteDirector.setDeleted(!deleteDirector.isDeleted());
                adminDirectorManagementRepository.save(deleteDirector);
            }
            return new ResponseObject("Thay đổi trạng thái đạo diễn thành công!");
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được đạo diễn này!");
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }
    }

}
