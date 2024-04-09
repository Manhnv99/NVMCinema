package nvm.project.qlcinema.core.admin.formatmanagement.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminFormatManagementPutRequest extends AdminFormatManagementPostRequest {

    private String formatId;

}
