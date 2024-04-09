package nvm.project.qlcinema.core.admin.areamanagement.service;

import nvm.project.qlcinema.core.admin.areamanagement.model.request.AdminAreaManagementListAreaRequest;
import nvm.project.qlcinema.core.admin.areamanagement.model.request.AdminAreaManagementPostRequest;
import nvm.project.qlcinema.core.admin.areamanagement.model.request.AdminAreaManagementPutRequest;
import nvm.project.qlcinema.core.admin.areamanagement.model.response.AdminAreaManagementListAreaResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface AdminAreaManagementService {

    PageableObject<AdminAreaManagementListAreaResponse> getListArea(AdminAreaManagementListAreaRequest request);

    ResponseObject postArea(AdminAreaManagementPostRequest postRequest);

    ResponseObject putArea(AdminAreaManagementPutRequest putRequest);

    ResponseObject deleteArea(String areaId);

    ResponseObject getDetailArea(String areaId);


}
