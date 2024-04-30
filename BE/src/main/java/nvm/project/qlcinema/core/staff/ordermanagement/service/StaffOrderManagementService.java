package nvm.project.qlcinema.core.staff.ordermanagement.service;

import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.core.staff.ordermanagement.model.request.StaffOrderManagementApprovedOrCancelRequest;
import nvm.project.qlcinema.core.staff.ordermanagement.model.request.StaffOrderManagementListOrderRequest;
import nvm.project.qlcinema.core.staff.ordermanagement.model.response.StaffOrderManagementListOrderResponse;
import nvm.project.qlcinema.core.common.PageableObject;

public interface StaffOrderManagementService {

    PageableObject<StaffOrderManagementListOrderResponse> getListSearchOrder(StaffOrderManagementListOrderRequest request);

    ResponseObject handleApprovedOrCancel(StaffOrderManagementApprovedOrCancelRequest approvedOrCancelRequest); //true is Approved,false is Cancel

}
