package nvm.project.qlcinema.core.admin.moviemanagement.service;

import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementListMovieRequest;
import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementPostRequest;
import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementPutRequest;
import nvm.project.qlcinema.core.admin.moviemanagement.model.response.AdminMovieManagementListMovieResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

import java.io.IOException;

public interface AdminMovieManagementService {

    PageableObject<AdminMovieManagementListMovieResponse> getSearchListMovie(AdminMovieManagementListMovieRequest request);

    ResponseObject getOneMovie(String id);

    ResponseObject getDetailMovie(String id);

    ResponseObject postMovie(AdminMovieManagementPostRequest postRequest) throws IOException;

    ResponseObject putMovie(AdminMovieManagementPutRequest putRequest) throws IOException;

    ResponseObject deleteMovie(String id);

}
