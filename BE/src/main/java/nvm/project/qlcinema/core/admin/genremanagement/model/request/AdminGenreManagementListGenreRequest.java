package nvm.project.qlcinema.core.admin.genremanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.core.common.PageableRequest;

@Getter
@Setter
public class AdminGenreManagementListGenreRequest extends PageableRequest {

    private String inputSearch;

}
