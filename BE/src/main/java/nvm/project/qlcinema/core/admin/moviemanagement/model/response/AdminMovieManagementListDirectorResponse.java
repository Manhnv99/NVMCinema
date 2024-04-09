package nvm.project.qlcinema.core.admin.moviemanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminMovieManagementListDirectorResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

}
