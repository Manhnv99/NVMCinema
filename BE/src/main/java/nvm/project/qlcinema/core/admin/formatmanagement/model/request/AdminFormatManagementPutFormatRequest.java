package nvm.project.qlcinema.core.admin.formatmanagement.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminFormatManagementPutFormatRequest extends AdminFormatManagementPostFormatRequest{

    private String formatId;

}
