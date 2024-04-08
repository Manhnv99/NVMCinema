package nvm.project.qlcinema.core.admin.formatmanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.core.common.PageableRequest;

@Getter
@Setter
public class AdminFormatManagementListFormatRequest extends PageableRequest {

    private String inputSearch;

}
