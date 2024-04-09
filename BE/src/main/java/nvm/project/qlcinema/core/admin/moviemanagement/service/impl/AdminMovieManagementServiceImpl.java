package nvm.project.qlcinema.core.admin.moviemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementPostRequest;
import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementPutRequest;
import nvm.project.qlcinema.core.admin.moviemanagement.repository.AdminMovieManagementRepository;
import nvm.project.qlcinema.core.admin.moviemanagement.service.AdminMovieManagementService;
import nvm.project.qlcinema.core.common.ResponseObject;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminMovieManagementServiceImpl implements AdminMovieManagementService {

    private final AdminMovieManagementRepository adminMovieManagementRepository;

    @Override
    public ResponseObject postMovie(AdminMovieManagementPostRequest postRequest) {



        return null;
    }

    @Override
    public ResponseObject putMovie(AdminMovieManagementPutRequest putRequest) {
        return null;
    }
}
