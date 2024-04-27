package nvm.project.qlcinema.core.admin.ordermanagement.service;

import nvm.project.qlcinema.core.admin.ordermanagement.model.request.AdminOrderManagementListOrderRequest;
import nvm.project.qlcinema.core.admin.ordermanagement.model.response.AdminOrderManagementListOrderResponse;
import nvm.project.qlcinema.core.common.PageableObject;

public interface AdminOrderManagementService {

    PageableObject<AdminOrderManagementListOrderResponse> getListSearchOrder(AdminOrderManagementListOrderRequest request);

}
