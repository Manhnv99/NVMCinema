package nvm.project.qlcinema.core.client.bookticket.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface ClientBookTicketListBranchResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.address}")
    String getAddress();

}
