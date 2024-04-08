package nvm.project.qlcinema.core.admin.genremanagement.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminGenreManagementPutGenreRequest extends AdminGenreManagementPostGenreRequest {

    private String genreId;

}
