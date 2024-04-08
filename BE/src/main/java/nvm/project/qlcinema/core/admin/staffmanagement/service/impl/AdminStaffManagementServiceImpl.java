package nvm.project.qlcinema.core.admin.staffmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.staffmanagement.model.request.AdminStaffManagementListStaffRequest;
import nvm.project.qlcinema.core.admin.staffmanagement.model.response.AdminStaffManagementListStaffResponse;
import nvm.project.qlcinema.core.admin.staffmanagement.repository.AdminStaffManagementAreaRepository;
import nvm.project.qlcinema.core.admin.staffmanagement.repository.AdminStaffManagementStaffRepository;
import nvm.project.qlcinema.core.admin.staffmanagement.service.AdminStaffManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.User;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminStaffManagementServiceImpl implements AdminStaffManagementService {

    private final AdminStaffManagementAreaRepository adminStaffManagementAreaRepository;

    private final AdminStaffManagementStaffRepository adminStaffManagementStaffRepository;

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
}
