package nvm.project.qlcinema.core.adminarea.staffmanagement.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.adminarea.staffmanagement.model.request.AdminAreaStaffManagementListStaffRequest;
import nvm.project.qlcinema.core.adminarea.staffmanagement.model.request.AdminAreaStaffManagementPostRequest;
import nvm.project.qlcinema.core.adminarea.staffmanagement.model.request.AdminAreaStaffManagementPutRequest;
import nvm.project.qlcinema.core.adminarea.staffmanagement.model.response.AdminAreaStaffManagementListStaffResponse;
import nvm.project.qlcinema.core.adminarea.staffmanagement.service.AdminAreaStaffManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlPath.URL_API_ADMIN_AREA_STAFF_MANAGEMENT)
public class AdminAreaStaffManagementController {

    private final AdminAreaStaffManagementService adminAreaStaffManagementService;

    @GetMapping("/get-all-branch/{areaId}")
    public ResponseObject getListBranch(@PathVariable String areaId) {
        return adminAreaStaffManagementService.getListBranch(areaId);
    }

    @GetMapping("/get-search-staff")
    public PageableObject<AdminAreaStaffManagementListStaffResponse> getListStaff(AdminAreaStaffManagementListStaffRequest adminAreaStaffManagementListStaffRequest) {
        return adminAreaStaffManagementService.getListStaff(adminAreaStaffManagementListStaffRequest);
    }

    @GetMapping("/get-one-staff")
    public ResponseObject getOneStaff(@RequestParam(name = "userId") String userId) {
        return adminAreaStaffManagementService.getOneStaff(userId);
    }

    @GetMapping("/get-detail-staff")
    public ResponseObject getDetailStaff(@RequestParam(name = "userId") String userId) {
        return adminAreaStaffManagementService.getDetailStaff(userId);
    }

    @DeleteMapping("/delete-staff/{userId}")
    public ResponseObject deleteStaff(@PathVariable String userId) {
        return adminAreaStaffManagementService.deleteStaff(userId);
    }

    @PostMapping("/post-staff")
    public ResponseObject postStaff(@ModelAttribute @Valid AdminAreaStaffManagementPostRequest postRequest) throws IOException {
        return adminAreaStaffManagementService.postStaff(postRequest);
    }

    @PutMapping("/put-staff")
    public ResponseObject putStaff(@ModelAttribute @Valid AdminAreaStaffManagementPutRequest putRequest) throws IOException {
        return adminAreaStaffManagementService.putStaff(putRequest);
    }

}
