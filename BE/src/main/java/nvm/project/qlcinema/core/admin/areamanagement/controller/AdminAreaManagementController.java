package nvm.project.qlcinema.core.admin.areamanagement.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.areamanagement.model.request.AdminAreaManagementListAreaRequest;
import nvm.project.qlcinema.core.admin.areamanagement.model.request.AdminAreaManagementPostRequest;
import nvm.project.qlcinema.core.admin.areamanagement.model.request.AdminAreaManagementPutRequest;
import nvm.project.qlcinema.core.admin.areamanagement.model.response.AdminAreaManagementListAreaResponse;
import nvm.project.qlcinema.core.admin.areamanagement.service.AdminAreaManagementService;
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
@RequestMapping(UrlPath.URL_API_ADMIN_AREA_MANAGEMENT)
@RequiredArgsConstructor
public class AdminAreaManagementController {

    private final AdminAreaManagementService adminAreaManagementService;

    @GetMapping("/get-search-area")
    public PageableObject<AdminAreaManagementListAreaResponse> getListArea(final AdminAreaManagementListAreaRequest request){
        return adminAreaManagementService.getListArea(request);
    }

    @GetMapping("/get-detail-area/{areaId}")
    public ResponseObject getDetailArea(@PathVariable String areaId){
        return adminAreaManagementService.getDetailArea(areaId);
    }

    @PostMapping("/post-area")
    public ResponseObject postArea(@RequestBody @Valid AdminAreaManagementPostRequest postRequest){
        return adminAreaManagementService.postArea(postRequest);
    }

    @PutMapping("/put-area")
    public ResponseObject putArea(@RequestBody @Valid AdminAreaManagementPutRequest putRequest){
        return adminAreaManagementService.putArea(putRequest);
    }

    @DeleteMapping("/delete-area/{areaId}")
    public ResponseObject deleteArea(@PathVariable String areaId){
        return adminAreaManagementService.deleteArea(areaId);
    }

}
