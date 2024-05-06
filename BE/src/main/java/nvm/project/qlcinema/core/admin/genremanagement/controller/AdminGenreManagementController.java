package nvm.project.qlcinema.core.admin.genremanagement.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.genremanagement.model.request.AdminGenreManagementListGenreRequest;
import nvm.project.qlcinema.core.admin.genremanagement.model.request.AdminGenreManagementPostRequest;
import nvm.project.qlcinema.core.admin.genremanagement.model.request.AdminGenreManagementPutRequest;
import nvm.project.qlcinema.core.admin.genremanagement.model.response.AdminGenreManagementListGenreResponse;
import nvm.project.qlcinema.core.admin.genremanagement.service.AdminGenreManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(UrlPath.URL_API_ADMIN_GENRE_MANAGEMENT)
@RequiredArgsConstructor
public class AdminGenreManagementController {

    private final AdminGenreManagementService adminGenreManagementService;

    @GetMapping("/get-search-genre")
    public PageableObject<AdminGenreManagementListGenreResponse> getListGenre(final AdminGenreManagementListGenreRequest request) {
        return adminGenreManagementService.getListGenre(request);
    }

    @GetMapping("/get-detail-genre/{genreId}")
    public ResponseObject getDetailGenre(@PathVariable String genreId) {
        return adminGenreManagementService.getDetailGenre(genreId);
    }

    @PostMapping("/post-genre")
    public ResponseObject postGenre(@RequestBody @Valid AdminGenreManagementPostRequest postRequest) {
        return adminGenreManagementService.postGenre(postRequest);
    }

    @PutMapping("/put-genre")
    public ResponseObject putGenre(@RequestBody @Valid AdminGenreManagementPutRequest putRequest) {
        return adminGenreManagementService.putGenre(putRequest);
    }

    @DeleteMapping("/delete-genre/{genreId}")
    public ResponseObject deleteGenre(@PathVariable String genreId) {
        return adminGenreManagementService.deleteGenre(genreId);
    }

}
