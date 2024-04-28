package nvm.project.qlcinema.core.adminarea.showtimemanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.core.common.PageableRequest;

@Getter
@Setter
public class AdminAreaShowTimeManagementListShowTimeRequest extends PageableRequest {

    private String movieName = "";

    private String areaId = "";

    private String branchId = "";

    private String roomId = "";

}
