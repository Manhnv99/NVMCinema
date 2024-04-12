package nvm.project.qlcinema.core.admin.branchmanagement.service;

import nvm.project.qlcinema.core.admin.branchmanagement.model.request.AdminBranchManagementListBranchRequest;
import nvm.project.qlcinema.core.admin.branchmanagement.model.request.AdminBranchManagementPostRequest;
import nvm.project.qlcinema.core.admin.branchmanagement.model.request.AdminBranchManagementPutRequest;
import nvm.project.qlcinema.core.admin.branchmanagement.model.response.AdminBranchManagementListBranchResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

import java.io.IOException;

public interface AdminBranchManagementService {

    PageableObject<AdminBranchManagementListBranchResponse> getListBranch(AdminBranchManagementListBranchRequest request);

    ResponseObject getListArea();

    ResponseObject postBranch(AdminBranchManagementPostRequest postRequest) throws IOException;

    ResponseObject putBranch(AdminBranchManagementPutRequest putRequest) throws IOException;

    ResponseObject deleteBranch(String areaId);

    ResponseObject getDetailBranch(String id);

    ResponseObject getOneBranch(String id);

}
