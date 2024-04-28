package nvm.project.qlcinema.core.admin.staffmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.staffmanagement.model.request.AdminStaffManagementListStaffRequest;
import nvm.project.qlcinema.core.admin.staffmanagement.model.request.AdminStaffManagementPostRequest;
import nvm.project.qlcinema.core.admin.staffmanagement.model.request.AdminStaffManagementPutRequest;
import nvm.project.qlcinema.core.admin.staffmanagement.model.response.AdminStaffManagementListStaffResponse;
import nvm.project.qlcinema.core.admin.staffmanagement.repository.AdminStaffManagementAreaRepository;
import nvm.project.qlcinema.core.admin.staffmanagement.repository.AdminStaffManagementStaffRepository;
import nvm.project.qlcinema.core.admin.staffmanagement.service.AdminStaffManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.Area;
import nvm.project.qlcinema.entity.User;
import nvm.project.qlcinema.infrastructure.config.cloudinary.CloudinaryConfig;
import nvm.project.qlcinema.infrastructure.constant.Role;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import nvm.project.qlcinema.utils.ValidUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminStaffManagementServiceImpl implements AdminStaffManagementService {

    private final AdminStaffManagementAreaRepository adminStaffManagementAreaRepository;

    private final AdminStaffManagementStaffRepository adminStaffManagementStaffRepository;

    private final CloudinaryConfig cloudinaryConfig;

    private final PasswordEncoder passwordEncoder;

    private final ValidUtils validUtils;

    @Override
    public ResponseObject getListArea() {
        try {
            return new ResponseObject(adminStaffManagementAreaRepository.getListArea());
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách khu vực!");
            throw new RestApiException(errors, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public PageableObject<AdminStaffManagementListStaffResponse> getListStaff(AdminStaffManagementListStaffRequest request) {
        try {
            PageRequest pageRequest = PageRequest.of(request.getPage() - 1,request.getSize());
            return new PageableObject<>(adminStaffManagementStaffRepository.getListStaff(
                    pageRequest,
                    request
            ));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách nhân viên!");
            throw new RestApiException(errors, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseObject getOneStaff(String userId) {
        try {
            if(adminStaffManagementStaffRepository.getOneStaff(userId) == null){
                throw new Exception();
            }else{
                return new ResponseObject(adminStaffManagementStaffRepository.getOneStaff(userId));
            }
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được nhân viên này!");
            throw new RestApiException(errors, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseObject getDetailStaff(String userId) {
        try {
            if(adminStaffManagementStaffRepository.getDetailStaff(userId) == null){
                throw new Exception();
            }else{
                return new ResponseObject(adminStaffManagementStaffRepository.getDetailStaff(userId));
            }
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được nhân viên này!");
            throw new RestApiException(errors, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseObject deleteStaff(String userId) {
        try {
            Optional<User> userOptional = adminStaffManagementStaffRepository.findById(userId);
            if(userOptional.isEmpty()){
                throw new Exception();
            }else{
                if(userOptional.get().isStatus()){
                    userOptional.get().setStatus(false);
                }else{
                    userOptional.get().setStatus(true);
                }
                adminStaffManagementStaffRepository.save(userOptional.get());
                return new ResponseObject("Thay đổi trạng thái nhân viên thành công!");
            }
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được nhân viên này!");
            throw new RestApiException(errors, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseObject postStaff(AdminStaffManagementPostRequest postRequest) throws IOException {
        List<String> errors = new ArrayList<>();

        //check Image Empty
        if(postRequest.getImage().isEmpty()){
            errors.add("Bạn chưa chọn ảnh đại diện!");
        }
        //throw Errors
        if(!errors.isEmpty()){
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //check Valid
        if(validUtils.isCccdValid(postRequest.getCccd())){
            errors.add("Căn cước công dân không hợp lệ");
        }
        if(validUtils.isPhoneValid(postRequest.getPhoneNumber())){
            errors.add("Số điện thoại không hợp lệ!");
        }
        //throw Errors
        if(!errors.isEmpty()){
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //check Exist
        Optional<User> isEmailExist = adminStaffManagementStaffRepository.findUserByEmail(postRequest.getEmail());
        if(isEmailExist.isPresent()){
            errors.add("Email này đã tồn tại!");
        }
        Optional<User> isCccdExist = adminStaffManagementStaffRepository.findUserByCccd(postRequest.getCccd());
        if(isCccdExist.isPresent()){
            errors.add("Căn cước công dân này đã tồn tại!");
        }
        Optional<User> isPhoneNumberExist = adminStaffManagementStaffRepository.findUserByPhoneNumber(postRequest.getPhoneNumber());
        if(isPhoneNumberExist.isPresent()){
            errors.add("Số điện thoại này đã tồn tại!");
        }
        Optional<Area> isAreaExist = adminStaffManagementAreaRepository.findById(postRequest.getAreaId());
        if(isAreaExist.isEmpty()){
            errors.add("Không tồn tại khu vực này!");
        }
        //throw Errors
        if(!errors.isEmpty()){
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //post User
        User postUser = new User();
        postUser.setCode(postRequest.getCode());
        postUser.setName(postRequest.getName());
        postUser.setCccd(postRequest.getCccd());
        postUser.setGender(postRequest.isGender());
        postUser.setBirthDay(postRequest.getBirthDay());
        postUser.setEmail(postRequest.getEmail());
        postUser.setPassword(passwordEncoder.encode(postRequest.getPassword()));
        postUser.setPhoneNumber(postRequest.getPhoneNumber());
        postUser.setAddress(postRequest.getAddress());
        postUser.setCreatedAt(new Date());
        for (Role role : Role.values()){
            if(postRequest.getRole().equals(role.name())){
                postUser.setRole(role);
            }
        }
        var result=cloudinaryConfig.upload(postRequest.getImage());//upload image to cloudinary
        postUser.setImageId((String) result.get("public_id"));
        postUser.setImageUrl((String) result.get("url"));
        postUser.setStatus(true);
        postUser.setAreaId(isAreaExist.get());
        adminStaffManagementStaffRepository.save(postUser);

        return new ResponseObject("Thêm mới nhân viên thành công!");
    }

    @Override
    public ResponseObject putStaff(AdminStaffManagementPutRequest putRequest) throws IOException {
        List<String> errors = new ArrayList<>();

        //check Valid
        if(validUtils.isCccdValid(putRequest.getCccd())){
            errors.add("Căn cước công dân không hợp lệ");
        }
        if(validUtils.isPhoneValid(putRequest.getPhoneNumber())){
            errors.add("Số điện thoại không hợp lệ!");
        }
        //throw Errors
        if(!errors.isEmpty()){
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //check Exist -> if the user change those fields make it different to their old -> will check duplicate
        Optional<User> putUserOptional = adminStaffManagementStaffRepository.findById(putRequest.getId());
        if(putUserOptional.isEmpty()){
            errors.add("Không tìm thấy nhân viên này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }else{
            if(!putUserOptional.get().getEmail().equalsIgnoreCase(putRequest.getEmail())){
                Optional<User> isEmailExist = adminStaffManagementStaffRepository.findUserByEmail(putRequest.getEmail());
                if(isEmailExist.isPresent()){
                    errors.add("Email này đã tồn tại!");
                }
            }
            if(!putUserOptional.get().getCccd().equalsIgnoreCase(putRequest.getCccd())){
                Optional<User> isCccdExist = adminStaffManagementStaffRepository.findUserByCccd(putRequest.getCccd());
                if(isCccdExist.isPresent()){
                    errors.add("Căn cước công dân này đã tồn tại!");
                }
            }
            if(!putUserOptional.get().getPhoneNumber().equalsIgnoreCase(putRequest.getPhoneNumber())){
                Optional<User> isPhoneNumberExist = adminStaffManagementStaffRepository.findUserByPhoneNumber(putRequest.getPhoneNumber());
                if(isPhoneNumberExist.isPresent()){
                    errors.add("Số điện thoại này đã tồn tại!");
                }
            }
            //throw Errors
            if(!errors.isEmpty()){
                throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
            }
        }

        //check is Area Exist
        Optional<Area> isAreaExist = adminStaffManagementAreaRepository.findById(putRequest.getAreaId());
        if(isAreaExist.isEmpty()){
            errors.add("Không tồn tại khu vực này!");
        }
        //throw Errors
        if(!errors.isEmpty()){
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //post User
        User putUser = putUserOptional.get();
        putUser.setCode(putRequest.getCode());
        putUser.setName(putRequest.getName());
        putUser.setCccd(putRequest.getCccd());
        putUser.setGender(putRequest.isGender());
        putUser.setBirthDay(putRequest.getBirthDay());
        putUser.setEmail(putRequest.getEmail());
        putUser.setPhoneNumber(putRequest.getPhoneNumber());
        putUser.setAddress(putRequest.getAddress());
        for (Role role : Role.values()){
            if(putRequest.getRole().equals(role.name())){
                putUser.setRole(role);
            }
        }
        //if User change their image -> do this
        if(!putRequest.getImage().isEmpty()){
            var result=cloudinaryConfig.upload(putRequest.getImage());//upload image to cloudinary
            putUser.setImageId((String) result.get("public_id"));
            putUser.setImageUrl((String) result.get("url"));
        }
        //Admin thì sẽ k cần khu vu
        putUser.setAreaId(isAreaExist.get());
        adminStaffManagementStaffRepository.save(putUser);

        return new ResponseObject("Cập nhật nhân viên thành công!");
    }

}
