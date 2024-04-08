package nvm.project.qlcinema.core.admin.staffmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.staffmanagement.model.request.AdminManagementListStaffRequest;
import nvm.project.qlcinema.core.admin.staffmanagement.model.response.AdminManagementListStaffResponse;
import nvm.project.qlcinema.core.admin.staffmanagement.repository.AdminManagementAreaRepository;
import nvm.project.qlcinema.core.admin.staffmanagement.repository.AdminManagementStaffRepository;
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

    private final AdminManagementAreaRepository adminManagementAreaRepository;

    private final AdminManagementStaffRepository adminManagementStaffRepository;

    @Override
    public ResponseObject getListArea() {
        try {
            return new ResponseObject(adminManagementAreaRepository.getListArea());
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách khu vực!");
            throw new RestApiException(errors, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public PageableObject<AdminManagementListStaffResponse> getListStaff(AdminManagementListStaffRequest request) {
        try {
            PageRequest pageRequest = PageRequest.of(request.getPage() - 1,request.getSize());
            return new PageableObject<>(adminManagementStaffRepository.getListStaff(
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
            if(adminManagementStaffRepository.getOneStaff(userId) == null){
                throw new Exception();
            }else{
                return new ResponseObject(adminManagementStaffRepository.getOneStaff(userId));
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
            if(adminManagementStaffRepository.getDetailStaff(userId) == null){
                throw new Exception();
            }else{
                return new ResponseObject(adminManagementStaffRepository.getDetailStaff(userId));
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
            Optional<User> userOptional = adminManagementStaffRepository.findById(userId);
            if(userOptional.isEmpty()){
                throw new Exception();
            }else{
                if(userOptional.get().isStatus()){
                    userOptional.get().setStatus(false);
                }else{
                    userOptional.get().setStatus(true);
                }
                adminManagementStaffRepository.save(userOptional.get());
                return new ResponseObject("Thay đổi trạng thái nhân viên thành công!");
            }
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được nhân viên này!");
            throw new RestApiException(errors, HttpStatus.NOT_FOUND);
        }
    }
}
