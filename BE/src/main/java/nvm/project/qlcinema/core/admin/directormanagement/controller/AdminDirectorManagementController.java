package nvm.project.qlcinema.core.admin.directormanagement.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.directormanagement.model.request.AdminDirectorManagementListDirectorRequest;
import nvm.project.qlcinema.core.admin.directormanagement.model.request.AdminDirectorManagementPostRequest;
import nvm.project.qlcinema.core.admin.directormanagement.model.request.AdminDirectorManagementPutRequest;
import nvm.project.qlcinema.core.admin.directormanagement.model.response.AdminDirectorManagementListDirectorResponse;
import nvm.project.qlcinema.core.admin.directormanagement.service.AdminDirectorManagementService;
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
@RequestMapping(UrlPath.URL_API_ADMIN_DIRECTOR_MANAGEMENT)
@RequiredArgsConstructor
public class AdminDirectorManagementController {

    private final AdminDirectorManagementService adminDirectorManagementService;

    @GetMapping("/get-search-director")
    public PageableObject<AdminDirectorManagementListDirectorResponse> getListDirector(final AdminDirectorManagementListDirectorRequest request){
        return adminDirectorManagementService.getListDirector(request);
    }

    @GetMapping("/get-detail-director/{directorId}")
    public ResponseObject getDetailDirector(@PathVariable String directorId){
        return adminDirectorManagementService.getDetailDirector(directorId);
    }

    @PostMapping("/post-director")
    public ResponseObject postDirector(@RequestBody @Valid AdminDirectorManagementPostRequest request){
        return adminDirectorManagementService.postDirector(request);
    }

    @PutMapping("/put-director")
    public ResponseObject putDirector(@RequestBody @Valid AdminDirectorManagementPutRequest request){
        return adminDirectorManagementService.putDirector(request);
    }

    @DeleteMapping("/delete-director/{directorId}")
    public ResponseObject deleteDirector(@PathVariable String directorId){
        return adminDirectorManagementService.deleteDirector(directorId);
    }

}
