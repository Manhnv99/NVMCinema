package nvm.project.qlcinema.core.admin.roommanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.core.common.PageableRequest;

@Getter
@Setter
public class AdminRoomManagementListRoomRequest extends PageableRequest {

    private String inputSearch;

    private String branchId;

}
