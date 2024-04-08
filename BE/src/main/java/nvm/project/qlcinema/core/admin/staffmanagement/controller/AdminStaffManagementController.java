package nvm.project.qlcinema.core.admin.staffmanagement.controller;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.staffmanagement.model.request.AdminManagementListStaffRequest;
import nvm.project.qlcinema.core.admin.staffmanagement.model.response.AdminManagementListStaffResponse;
import nvm.project.qlcinema.core.admin.staffmanagement.service.AdminStaffManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlPath.URL_API_ADMIN_STAFF_MANAGEMENT)
public class AdminStaffManagementController {

    private final AdminStaffManagementService adminStaffManagementService;

    @GetMapping("/get-all-area")
    public ResponseObject getListArea(){
        return adminStaffManagementService.getListArea();
    }

    @GetMapping("/get-search-staff")
    public PageableObject<AdminManagementListStaffResponse> getListStaff(AdminManagementListStaffRequest adminManagementListStaffRequest){
        return adminStaffManagementService.getListStaff(adminManagementListStaffRequest);
    }

    @GetMapping("/get-one-staff")
    public ResponseObject getOneStaff(@RequestParam(name = "userId") String userId){
        return adminStaffManagementService.getOneStaff(userId);
    }

    @GetMapping("/get-detail-staff")
    public ResponseObject getDetailStaff(@RequestParam(name = "userId") String userId){
        return adminStaffManagementService.getDetailStaff(userId);
    }

    @DeleteMapping("/delete-staff/{userId}")
    public ResponseObject deleteStaff(@PathVariable String userId){
        return adminStaffManagementService.deleteStaff(userId);
    }

}
