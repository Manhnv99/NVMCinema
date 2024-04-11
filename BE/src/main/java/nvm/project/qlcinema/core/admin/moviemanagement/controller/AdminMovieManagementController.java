package nvm.project.qlcinema.core.admin.moviemanagement.controller;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementListMovieRequest;
import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementPostRequest;
import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementPutRequest;
import nvm.project.qlcinema.core.admin.moviemanagement.model.response.AdminMovieManagementListMovieResponse;
import nvm.project.qlcinema.core.admin.moviemanagement.service.AdminMovieManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin("*")
@RequestMapping(UrlPath.URL_API_ADMIN_MOVIE_MANAGEMENT)
@RestController
@RequiredArgsConstructor
public class AdminMovieManagementController {

    private final AdminMovieManagementService adminMovieManagementService;

    @GetMapping("/get-search-movie")
    public PageableObject<AdminMovieManagementListMovieResponse> getSearchListMovie(final AdminMovieManagementListMovieRequest request){
        return adminMovieManagementService.getSearchListMovie(request);
    }

    @GetMapping("/get-one-movie/{id}")
    public ResponseObject getOneMovie(@PathVariable String id){
        return adminMovieManagementService.getOneMovie(id);
    }

    @GetMapping("/get-detail-movie/{id}")
    public ResponseObject getDetailMovie(@PathVariable String id){
        return adminMovieManagementService.getDetailMovie(id);
    }

    @PostMapping("/post-movie")
    public ResponseObject postMovie(@ModelAttribute AdminMovieManagementPostRequest postRequest) throws IOException {
        return adminMovieManagementService.postMovie(postRequest);
    }

    @PutMapping("/put-movie")
    public ResponseObject putMovie(@ModelAttribute AdminMovieManagementPutRequest putRequest) throws IOException {
        return adminMovieManagementService.putMovie(putRequest);
    }

    @DeleteMapping("/delete-movie/{id}")
    public ResponseObject deleteMovie(@PathVariable String id){
        return adminMovieManagementService.deleteMovie(id);
    }

}
