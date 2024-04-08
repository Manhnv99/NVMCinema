package nvm.project.qlcinema.core.admin.areamanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.core.common.PageableRequest;

@Getter
@Setter
public class AdminAreaManagementListAreaRequest extends PageableRequest {

    private String inputSearch;

}
