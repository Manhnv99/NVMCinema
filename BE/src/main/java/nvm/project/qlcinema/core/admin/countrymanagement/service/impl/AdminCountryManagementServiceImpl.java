package nvm.project.qlcinema.core.admin.countrymanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.countrymanagement.model.request.AdminCountryManagementListCountryRequest;
import nvm.project.qlcinema.core.admin.countrymanagement.model.request.AdminCountryManagementPostRequest;
import nvm.project.qlcinema.core.admin.countrymanagement.model.request.AdminCountryManagementPutRequest;
import nvm.project.qlcinema.core.admin.countrymanagement.model.response.AdminCountryManagementListCountryResponse;
import nvm.project.qlcinema.core.admin.countrymanagement.repository.AdminCountryManagementRepository;
import nvm.project.qlcinema.core.admin.countrymanagement.service.AdminCountryManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.Country;
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
public class AdminCountryManagementServiceImpl implements AdminCountryManagementService {

    private final AdminCountryManagementRepository adminCountryManagementRepository;

    @Override
    public PageableObject<AdminCountryManagementListCountryResponse> getListCountry(AdminCountryManagementListCountryRequest request) {
        try {
            PageRequest pageRequest = PageRequest.of(request.getPage() - 1, request.getSize());
            return new PageableObject<>(adminCountryManagementRepository.getListCountry(pageRequest,request));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách đất nước!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject postCountry(AdminCountryManagementPostRequest postRequest) {
        List<String> errors = new ArrayList<>();

        //check isExist
        Optional<Country> isCountryNameExist = adminCountryManagementRepository.findByName(postRequest.getName());
        if(isCountryNameExist.isPresent()){
            errors.add("Đã tồn tại tên đất nước này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //post
        Country postCountry = new Country();
        Optional<Country> CountryNewest = adminCountryManagementRepository.getNewest();
        if(CountryNewest.isPresent()){
            String code = CountryNewest.get().getCode();
            postCountry.setCode(code.substring(0,2)+((Integer.parseInt(code.substring(2)))+1));
        }else{
            postCountry.setCode("CT1");
        }
        postCountry.setName(postRequest.getName());
        postCountry.setDeleted(true);
        postCountry.setCreatedAt(new Date());
        adminCountryManagementRepository.save(postCountry);

        return new ResponseObject("Tạo mới thành công đất nước!");
    }

    @Override
    public ResponseObject putCountry(AdminCountryManagementPutRequest putRequest) {
        List<String> errors = new ArrayList<>();

        //check isExist
        Optional<Country> CountryOptional = adminCountryManagementRepository.findById(putRequest.getCountryId());
        if(CountryOptional.isEmpty()){
            errors.add("Không tìm thấy đất nước này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }else{
            if(!CountryOptional.get().getName().equals(putRequest.getName())){
                Optional<Country> isCountryNameExist = adminCountryManagementRepository.findByName(putRequest.getName());
                if(isCountryNameExist.isPresent()){
                    errors.add("Đã tồn tại tên đất nước này!");
                    throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
                }
            }
        }

        //post
        Country postCountry = CountryOptional.get();
        postCountry.setName(putRequest.getName());
        adminCountryManagementRepository.save(postCountry);

        return new ResponseObject("Cập nhật thành công đất nước!");
    }

    @Override
    public ResponseObject deleteCountry(String countryId) {
        try {
            Optional<Country> optionalCountry = adminCountryManagementRepository.findById(countryId);
            if(optionalCountry.isEmpty()){
                throw new Exception();
            }else{
                Country deleteCountry = optionalCountry.get();
                deleteCountry.setDeleted(!deleteCountry.isDeleted());
                adminCountryManagementRepository.save(deleteCountry);
                return new ResponseObject("Thay đổi trạng thái đất nước thành công!");
            }
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được đất nước này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getDetailCountry(String countryId) {
        try {
            return new ResponseObject(adminCountryManagementRepository.getDetailCountry(countryId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được đất nước này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

}
