package nvm.project.qlcinema.core.admin.formatmanagement.service;

import nvm.project.qlcinema.core.admin.formatmanagement.model.request.AdminFormatManagementListFormatRequest;
import nvm.project.qlcinema.core.admin.formatmanagement.model.request.AdminFormatManagementPostRequest;
import nvm.project.qlcinema.core.admin.formatmanagement.model.request.AdminFormatManagementPutRequest;
import nvm.project.qlcinema.core.admin.formatmanagement.model.response.AdminFormatManagementListFormatResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface AdminFormatManagementService {

    PageableObject<AdminFormatManagementListFormatResponse> getListFormat(AdminFormatManagementListFormatRequest request);

    ResponseObject postFormat(AdminFormatManagementPostRequest postRequest);

    ResponseObject putFormat(AdminFormatManagementPutRequest putRequest);

    ResponseObject deleteFormat(String formatId);

    ResponseObject getDetailFormat(String formatId);


}
