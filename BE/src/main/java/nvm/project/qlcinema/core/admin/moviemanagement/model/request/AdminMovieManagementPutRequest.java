package nvm.project.qlcinema.core.admin.moviemanagement.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminMovieManagementPutRequest extends AdminMovieManagementPostRequest {

    private String id;

}
