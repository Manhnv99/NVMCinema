package nvm.project.qlcinema.core.admin.roommanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminRoomManagementListChairResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.columnC}")
    String getColumn();

    @Value("#{target.rowC}")
    Integer getRow();

}
