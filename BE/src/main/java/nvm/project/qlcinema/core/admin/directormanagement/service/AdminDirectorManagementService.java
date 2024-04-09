package nvm.project.qlcinema.core.admin.directormanagement.service;

import nvm.project.qlcinema.core.admin.directormanagement.model.request.AdminDirectorManagementListDirectorRequest;
import nvm.project.qlcinema.core.admin.directormanagement.model.request.AdminDirectorManagementPostRequest;
import nvm.project.qlcinema.core.admin.directormanagement.model.request.AdminDirectorManagementPutRequest;
import nvm.project.qlcinema.core.admin.directormanagement.model.response.AdminDirectorManagementListDirectorResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface AdminDirectorManagementService {

    PageableObject<AdminDirectorManagementListDirectorResponse> getListDirector(AdminDirectorManagementListDirectorRequest request);

    ResponseObject getDetailDirector(String directorId);

    ResponseObject postDirector(AdminDirectorManagementPostRequest postRequest);

    ResponseObject putDirector(AdminDirectorManagementPutRequest putRequest);

    ResponseObject deleteDirector(String directorId);

}
