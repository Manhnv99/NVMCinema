package nvm.project.qlcinema.core.admin.formatmanagement.controller;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.formatmanagement.model.request.AdminFormatManagementListFormatRequest;
import nvm.project.qlcinema.core.admin.formatmanagement.model.request.AdminFormatManagementPostFormatRequest;
import nvm.project.qlcinema.core.admin.formatmanagement.model.request.AdminFormatManagementPutFormatRequest;
import nvm.project.qlcinema.core.admin.formatmanagement.model.response.AdminFormatManagementListFormatResponse;
import nvm.project.qlcinema.core.admin.formatmanagement.service.AdminFormatManagementService;
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
@RequestMapping(UrlPath.URL_API_ADMIN_FORMAT_MANAGEMENT)
@RequiredArgsConstructor
public class AdminFormatManagementController {

    private final AdminFormatManagementService adminFormatManagementService;

    @GetMapping("/get-search-format")
    public PageableObject<AdminFormatManagementListFormatResponse> getListFormat(final AdminFormatManagementListFormatRequest request){
        return adminFormatManagementService.getListFormat(request);
    }

    @GetMapping("/get-detail-format/{formatId}")
    public ResponseObject getDetailFormat(@PathVariable String formatId){
        return adminFormatManagementService.getDetailFormat(formatId);
    }

    @PostMapping("/post-format")
    public ResponseObject postFormat(@RequestBody AdminFormatManagementPostFormatRequest postRequest){
        return adminFormatManagementService.postFormat(postRequest);
    }

    @PutMapping("/put-format")
    public ResponseObject putFormat(@RequestBody AdminFormatManagementPutFormatRequest putRequest){
        return adminFormatManagementService.putFormat(putRequest);
    }

    @DeleteMapping("/delete-format/{formatId}")
    public ResponseObject deleteFormat(@PathVariable String formatId){
        return adminFormatManagementService.deleteFormat(formatId);
    }

}
