package nvm.project.qlcinema.core.client.homepage.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface ClientHomePageListAreaResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

}
