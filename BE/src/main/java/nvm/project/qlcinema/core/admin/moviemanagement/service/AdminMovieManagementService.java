package nvm.project.qlcinema.core.admin.moviemanagement.service;

import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementPostRequest;
import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementPutRequest;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface AdminMovieManagementService {

    ResponseObject postMovie(AdminMovieManagementPostRequest postRequest);

    ResponseObject putMovie(AdminMovieManagementPutRequest putRequest);

}
