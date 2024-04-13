package nvm.project.qlcinema.core.admin.branchmanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.core.common.PageableRequest;

@Getter
@Setter
public class AdminBranchManagementListBranchRequest extends PageableRequest {

    private String inputSearch;

    private String areaId;

}
