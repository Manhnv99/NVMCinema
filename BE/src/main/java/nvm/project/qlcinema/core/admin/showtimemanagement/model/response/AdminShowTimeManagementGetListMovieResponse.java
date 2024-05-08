package nvm.project.qlcinema.core.admin.showtimemanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;

public interface AdminShowTimeManagementGetListMovieResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

}
