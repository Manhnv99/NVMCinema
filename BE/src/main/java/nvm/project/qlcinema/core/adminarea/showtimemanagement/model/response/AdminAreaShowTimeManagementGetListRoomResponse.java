package nvm.project.qlcinema.core.adminarea.showtimemanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminAreaShowTimeManagementGetListRoomResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

}
