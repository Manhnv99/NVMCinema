package nvm.project.qlcinema.core.admin.staffmanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.core.common.PageableRequest;

@Getter
@Setter
public class AdminStaffManagementListStaffRequest extends PageableRequest {

    private String inputSearch;

}
