package nvm.project.qlcinema.core.admin.moviemanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.core.common.PageableRequest;

@Getter
@Setter
public class AdminMovieManagementListMovieRequest extends PageableRequest {

    private String name = "";

    private String director = "";

    private String genre = "";

    private String format = "";

    private String country = "";

}
