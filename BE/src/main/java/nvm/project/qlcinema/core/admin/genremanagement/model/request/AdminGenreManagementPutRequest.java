package nvm.project.qlcinema.core.admin.genremanagement.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminGenreManagementPutRequest extends AdminGenreManagementPostRequest {

    private String genreId;

}
