package nvm.project.qlcinema.core.admin.formatmanagement.service;

import nvm.project.qlcinema.core.admin.formatmanagement.model.request.AdminFormatManagementListFormatRequest;
import nvm.project.qlcinema.core.admin.formatmanagement.model.request.AdminFormatManagementPostFormatRequest;
import nvm.project.qlcinema.core.admin.formatmanagement.model.request.AdminFormatManagementPutFormatRequest;
import nvm.project.qlcinema.core.admin.formatmanagement.model.response.AdminFormatManagementListFormatResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface AdminFormatManagementService {

    PageableObject<AdminFormatManagementListFormatResponse> getListFormat(AdminFormatManagementListFormatRequest request);

    ResponseObject postFormat(AdminFormatManagementPostFormatRequest postRequest);

    ResponseObject putFormat(AdminFormatManagementPutFormatRequest putRequest);

    ResponseObject deleteFormat(String formatId);

    ResponseObject getDetailFormat(String formatId);


}
