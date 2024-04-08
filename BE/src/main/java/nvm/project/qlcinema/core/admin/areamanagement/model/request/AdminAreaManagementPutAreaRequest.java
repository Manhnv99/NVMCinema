package nvm.project.qlcinema.core.admin.areamanagement.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminAreaManagementPutAreaRequest extends AdminAreaManagementPostAreaRequest {

    private String areaId;

}
