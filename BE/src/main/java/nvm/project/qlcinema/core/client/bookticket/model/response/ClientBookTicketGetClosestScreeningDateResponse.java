package nvm.project.qlcinema.core.client.bookticket.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface ClientBookTicketGetClosestScreeningDateResponse {

    @Value("#{target.screeningDate}")
    String getScreeningDate();

}
