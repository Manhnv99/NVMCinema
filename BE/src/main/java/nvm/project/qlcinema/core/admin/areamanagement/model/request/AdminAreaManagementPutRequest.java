package nvm.project.qlcinema.core.admin.areamanagement.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminAreaManagementPutRequest extends AdminAreaManagementPostRequest {

    private String areaId;

}
