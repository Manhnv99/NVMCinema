package nvm.project.qlcinema.core.adminarea.showtimemanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminAreaShowTimeManagementGetListTicketChairResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.status}")
    boolean getStatus();

}
