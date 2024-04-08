package nvm.project.qlcinema.core.admin.staffmanagement.service;

import nvm.project.qlcinema.core.admin.staffmanagement.model.request.AdminManagementListStaffRequest;
import nvm.project.qlcinema.core.admin.staffmanagement.model.response.AdminManagementListStaffResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface AdminStaffManagementService {

    ResponseObject getListArea();

    PageableObject<AdminManagementListStaffResponse> getListStaff(AdminManagementListStaffRequest adminManagementListStaffRequest);

    ResponseObject getOneStaff(String userId);

    ResponseObject getDetailStaff(String userId);

    ResponseObject deleteStaff(String userId);

}
