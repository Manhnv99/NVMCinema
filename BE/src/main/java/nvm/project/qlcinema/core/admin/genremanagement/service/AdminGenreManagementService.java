package nvm.project.qlcinema.core.admin.genremanagement.service;

import nvm.project.qlcinema.core.admin.genremanagement.model.request.AdminGenreManagementListGenreRequest;
import nvm.project.qlcinema.core.admin.genremanagement.model.request.AdminGenreManagementPostRequest;
import nvm.project.qlcinema.core.admin.genremanagement.model.request.AdminGenreManagementPutRequest;
import nvm.project.qlcinema.core.admin.genremanagement.model.response.AdminGenreManagementListGenreResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface AdminGenreManagementService {

    PageableObject<AdminGenreManagementListGenreResponse> getListGenre(AdminGenreManagementListGenreRequest request);

    ResponseObject postGenre(AdminGenreManagementPostRequest postRequest);

    ResponseObject putGenre(AdminGenreManagementPutRequest putRequest);

    ResponseObject deleteGenre(String genreId);

    ResponseObject getDetailGenre(String genreId);


}
