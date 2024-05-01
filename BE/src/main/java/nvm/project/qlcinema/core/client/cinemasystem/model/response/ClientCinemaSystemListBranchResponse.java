package nvm.project.qlcinema.core.client.cinemasystem.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface ClientCinemaSystemListBranchResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.name}")
    String getName();

}
