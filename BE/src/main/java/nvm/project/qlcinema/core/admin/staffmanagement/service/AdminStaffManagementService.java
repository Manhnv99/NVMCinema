package nvm.project.qlcinema.core.admin.staffmanagement.service;

import nvm.project.qlcinema.core.admin.staffmanagement.model.request.AdminStaffManagementListStaffRequest;
import nvm.project.qlcinema.core.admin.staffmanagement.model.response.AdminStaffManagementListStaffResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface AdminStaffManagementService {

    ResponseObject getListArea();

    PageableObject<AdminStaffManagementListStaffResponse> getListStaff(AdminStaffManagementListStaffRequest adminStaffManagementListStaffRequest);

    ResponseObject getOneStaff(String userId);

    ResponseObject getDetailStaff(String userId);

    ResponseObject deleteStaff(String userId);

}
