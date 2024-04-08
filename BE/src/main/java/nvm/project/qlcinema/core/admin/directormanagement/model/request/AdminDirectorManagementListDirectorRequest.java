package nvm.project.qlcinema.core.admin.directormanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.core.common.PageableRequest;

@Getter
@Setter
public class AdminDirectorManagementListDirectorRequest extends PageableRequest {

    private String inputSearch;

}
