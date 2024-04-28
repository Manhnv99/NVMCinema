package nvm.project.qlcinema.core.admin.staffmanagement.service;

import nvm.project.qlcinema.core.admin.staffmanagement.model.request.AdminStaffManagementListStaffRequest;
import nvm.project.qlcinema.core.admin.staffmanagement.model.request.AdminStaffManagementPostRequest;
import nvm.project.qlcinema.core.admin.staffmanagement.model.request.AdminStaffManagementPutRequest;
import nvm.project.qlcinema.core.admin.staffmanagement.model.response.AdminStaffManagementListStaffResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

import java.io.IOException;

public interface AdminStaffManagementService {

    ResponseObject getListArea();

    PageableObject<AdminStaffManagementListStaffResponse> getListStaff(AdminStaffManagementListStaffRequest adminStaffManagementListStaffRequest);

    ResponseObject getOneStaff(String userId);

    ResponseObject getDetailStaff(String userId);

    ResponseObject deleteStaff(String userId);

    ResponseObject postStaff(AdminStaffManagementPostRequest postRequest) throws IOException;

    ResponseObject putStaff(AdminStaffManagementPutRequest putRequest) throws IOException;

}
