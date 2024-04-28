package nvm.project.qlcinema.core.adminarea.staffmanagement.service;

import nvm.project.qlcinema.core.adminarea.staffmanagement.model.request.AdminAreaStaffManagementListStaffRequest;
import nvm.project.qlcinema.core.adminarea.staffmanagement.model.request.AdminAreaStaffManagementPostRequest;
import nvm.project.qlcinema.core.adminarea.staffmanagement.model.request.AdminAreaStaffManagementPutRequest;
import nvm.project.qlcinema.core.adminarea.staffmanagement.model.response.AdminAreaStaffManagementListStaffResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

import java.io.IOException;

public interface AdminAreaStaffManagementService {

    ResponseObject getListBranch(String areaId);

    PageableObject<AdminAreaStaffManagementListStaffResponse> getListStaff(AdminAreaStaffManagementListStaffRequest adminAreaStaffManagementListStaffRequest);

    ResponseObject getOneStaff(String userId);

    ResponseObject getDetailStaff(String userId);

    ResponseObject deleteStaff(String userId);

    ResponseObject postStaff(AdminAreaStaffManagementPostRequest postRequest) throws IOException;

    ResponseObject putStaff(AdminAreaStaffManagementPutRequest putRequest) throws IOException;

}
