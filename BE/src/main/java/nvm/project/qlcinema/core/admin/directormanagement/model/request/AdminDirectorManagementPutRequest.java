package nvm.project.qlcinema.core.admin.directormanagement.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminDirectorManagementPutRequest extends AdminDirectorManagementPostRequest {

    private String directorId;

}
