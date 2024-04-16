package nvm.project.qlcinema.core.admin.showtimemanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminShowTimeManagementGetListRoomResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

}
