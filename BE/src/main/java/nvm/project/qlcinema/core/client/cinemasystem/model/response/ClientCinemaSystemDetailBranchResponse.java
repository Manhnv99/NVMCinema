package nvm.project.qlcinema.core.client.cinemasystem.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface ClientCinemaSystemDetailBranchResponse {

    @Value("#{target.name}")
    String getName();

    @Value("#{target.address}")
    String getAddress();

    @Value("#{target.hostLine}")
    String getHostLine();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.totalRoom}")
    String getTotalRoom();

    @Value("#{target.image}")
    String getImage();

}
