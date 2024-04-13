package nvm.project.qlcinema.core.admin.branchmanagement.controller;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.branchmanagement.model.request.AdminBranchManagementListBranchRequest;
import nvm.project.qlcinema.core.admin.branchmanagement.model.request.AdminBranchManagementPostRequest;
import nvm.project.qlcinema.core.admin.branchmanagement.model.request.AdminBranchManagementPutRequest;
import nvm.project.qlcinema.core.admin.branchmanagement.model.response.AdminBranchManagementListBranchResponse;
import nvm.project.qlcinema.core.admin.branchmanagement.service.AdminBranchManagementService;
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
@RestController
@RequestMapping(UrlPath.URL_API_ADMIN_BRANCH_MANAGEMENT)
@RequiredArgsConstructor
public class AdminBranchManagementController {

    private final AdminBranchManagementService adminBranchManagementService;

    @GetMapping("/get-search-branch")
    public PageableObject<AdminBranchManagementListBranchResponse> getListBranch(final AdminBranchManagementListBranchRequest request){
        return adminBranchManagementService.getListBranch(request);
    }

    @GetMapping("/get-list-area")
    public ResponseObject getListArea(){
        return adminBranchManagementService.getListArea();
    }

    @GetMapping("/get-detail-branch/{id}")
    public ResponseObject getDetailBranch(@PathVariable String id){
        return adminBranchManagementService.getDetailBranch(id);
    }

    @GetMapping("/get-one-branch/{id}")
    public ResponseObject getOneBranch(@PathVariable String id){
        return adminBranchManagementService.getOneBranch(id);
    }

    @PostMapping("/post-branch")
    public ResponseObject postBranch(@ModelAttribute AdminBranchManagementPostRequest postRequest) throws IOException {
        return adminBranchManagementService.postBranch(postRequest);
    }

    @PutMapping("/put-branch")
    public ResponseObject putBranch(@ModelAttribute AdminBranchManagementPutRequest putRequest) throws IOException {
        return adminBranchManagementService.putBranch(putRequest);
    }

    @DeleteMapping("/delete-branch/{id}")
    public ResponseObject deleteBranch(@PathVariable String id){
        return adminBranchManagementService.deleteBranch(id);
    }

}
