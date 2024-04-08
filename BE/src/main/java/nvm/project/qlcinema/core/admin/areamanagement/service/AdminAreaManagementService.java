package nvm.project.qlcinema.core.admin.areamanagement.service;

import nvm.project.qlcinema.core.admin.areamanagement.model.request.AdminAreaManagementListAreaRequest;
import nvm.project.qlcinema.core.admin.areamanagement.model.request.AdminAreaManagementPostAreaRequest;
import nvm.project.qlcinema.core.admin.areamanagement.model.request.AdminAreaManagementPutAreaRequest;
import nvm.project.qlcinema.core.admin.areamanagement.model.response.AdminAreaManagementListAreaResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface AdminAreaManagementService {

    PageableObject<AdminAreaManagementListAreaResponse> getListArea(AdminAreaManagementListAreaRequest request);

    ResponseObject postArea(AdminAreaManagementPostAreaRequest postRequest);

    ResponseObject putArea(AdminAreaManagementPutAreaRequest putRequest);

    ResponseObject deleteArea(String areaId);

    ResponseObject getDetailArea(String areaId);


}
