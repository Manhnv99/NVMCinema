package nvm.project.qlcinema.core.adminarea.staffmanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.core.common.PageableRequest;

@Getter
@Setter
public class AdminAreaStaffManagementListStaffRequest extends PageableRequest {

    private String inputSearch;

    private String areaId;

}
