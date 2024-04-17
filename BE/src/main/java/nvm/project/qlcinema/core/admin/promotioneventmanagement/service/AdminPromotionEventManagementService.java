package nvm.project.qlcinema.core.admin.promotioneventmanagement.service;

import nvm.project.qlcinema.core.admin.promotioneventmanagement.model.request.AdminPromotionEventManagementListPromotionEventRequest;
import nvm.project.qlcinema.core.admin.promotioneventmanagement.model.request.AdminPromotionEventManagementPostRequest;
import nvm.project.qlcinema.core.admin.promotioneventmanagement.model.request.AdminPromotionEventManagementPutRequest;
import nvm.project.qlcinema.core.admin.promotioneventmanagement.model.response.AdminPromotionEventManagementListPromotionEventResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

import java.io.IOException;

public interface AdminPromotionEventManagementService {

    PageableObject<AdminPromotionEventManagementListPromotionEventResponse> getListSearchPromotionEvent(AdminPromotionEventManagementListPromotionEventRequest request);

    ResponseObject getDetailPromotionEvent(String id);

    ResponseObject postPromotionEvent(AdminPromotionEventManagementPostRequest postRequest) throws IOException;

    ResponseObject putPromotionEvent(AdminPromotionEventManagementPutRequest putRequest) throws IOException;

    ResponseObject deletePromotionEvent(String id);

}
