package nvm.project.qlcinema.core.admin.combofoodmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.combofoodmanagement.model.request.AdminComboFoodManagementListComboFoodRequest;
import nvm.project.qlcinema.core.admin.combofoodmanagement.model.request.AdminComboFoodManagementPostRequest;
import nvm.project.qlcinema.core.admin.combofoodmanagement.model.request.AdminComboFoodManagementPutRequest;
import nvm.project.qlcinema.core.admin.combofoodmanagement.model.response.AdminComboFoodManagementListComboFoodResponse;
import nvm.project.qlcinema.core.admin.combofoodmanagement.repository.AdminComboFoodManagementRepository;
import nvm.project.qlcinema.core.admin.combofoodmanagement.service.AdminComboFoodManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.ComboFood;
import nvm.project.qlcinema.infrastructure.config.cloudinary.CloudinaryConfig;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminComboFoodManagementServiceImpl implements AdminComboFoodManagementService {

    private final AdminComboFoodManagementRepository adminComboFoodManagementRepository;

    private final CloudinaryConfig cloudinaryConfig;

    @Override
    public PageableObject<AdminComboFoodManagementListComboFoodResponse> getListComboFood(AdminComboFoodManagementListComboFoodRequest request) {
        try {
            PageRequest pageRequest = PageRequest.of(request.getPage() - 1, request.getSize());
            return new PageableObject<>(adminComboFoodManagementRepository.getListComboFood(pageRequest,request));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách combo đồ ăn!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject postComboFood(AdminComboFoodManagementPostRequest postRequest) throws IOException {
        List<String> errors = new ArrayList<>();

        //check image is empty
        if(postRequest.getImage().isEmpty()){
            errors.add("Bạn chưa chọn ảnh cho combo này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //check isExist
        Optional<ComboFood> isComboFoodNameExist = adminComboFoodManagementRepository.findByName(postRequest.getName());
        if(isComboFoodNameExist.isPresent()){
            errors.add("Đã tồn tại tên combo này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //post
        ComboFood putComboFood = new ComboFood();
        Optional<ComboFood> ComboFoodNewest = adminComboFoodManagementRepository.getNewest();
        if(ComboFoodNewest.isPresent()){
            String code = ComboFoodNewest.get().getCode();
            putComboFood.setCode(code.substring(0,2)+((Integer.parseInt(code.substring(2)))+1));
        }else{
            putComboFood.setCode("CB1");
        }
        putComboFood.setName(postRequest.getName());
        putComboFood.setPrice(postRequest.getPrice());
        var result=cloudinaryConfig.upload(postRequest.getImage());//upload image to cloudinary
        putComboFood.setImageId((String) result.get("public_id"));
        putComboFood.setImageUrl((String) result.get("url"));
        putComboFood.setDeleted(true);
        putComboFood.setCreatedAt(new Date());
        adminComboFoodManagementRepository.save(putComboFood);

        return new ResponseObject("Tạo mới thành công ComboFood!");
    }

    @Override
    public ResponseObject putComboFood(AdminComboFoodManagementPutRequest putRequest) throws IOException {
        List<String> errors = new ArrayList<>();

        //check isExist
        Optional<ComboFood> ComboFoodOptional = adminComboFoodManagementRepository.findById(putRequest.getId());
        if(ComboFoodOptional.isEmpty()){
            errors.add("Không tìm thấy combo này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }else{
            if(!ComboFoodOptional.get().getName().equals(putRequest.getName())){
                Optional<ComboFood> isComboFoodNameExist = adminComboFoodManagementRepository.findByName(putRequest.getName());
                if(isComboFoodNameExist.isPresent()){
                    errors.add("Đã tồn tại combo này!");
                    throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
                }
            }
        }

        //put
        ComboFood putComboFood = ComboFoodOptional.get();
        putComboFood.setName(putRequest.getName());
        putComboFood.setPrice(putRequest.getPrice());
        if(!putRequest.getImage().isEmpty()){
            cloudinaryConfig.delete(putComboFood.getImageId());
            var result=cloudinaryConfig.upload(putRequest.getImage());//upload image to cloudinary
            putComboFood.setImageId((String) result.get("public_id"));
            putComboFood.setImageUrl((String) result.get("url"));
        }
        adminComboFoodManagementRepository.save(putComboFood);

        return new ResponseObject("Cập nhật thành công ComboFood!");
    }

    @Override
    public ResponseObject deleteComboFood(String comboFoodId) {
        try {
            Optional<ComboFood> optionalComboFood = adminComboFoodManagementRepository.findById(comboFoodId);
            if(optionalComboFood.isEmpty()){
                throw new Exception();
            }else{
                ComboFood deleteComboFood = optionalComboFood.get();
                deleteComboFood.setDeleted(!deleteComboFood.isDeleted());
                adminComboFoodManagementRepository.save(deleteComboFood);
                return new ResponseObject("Thay đổi trạng thái ComboFood thành công!");
            }
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được combo này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getDetailComboFood(String comboFoodId) {
        try {
            return new ResponseObject(adminComboFoodManagementRepository.getDetailComboFood(comboFoodId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được combo này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

}
