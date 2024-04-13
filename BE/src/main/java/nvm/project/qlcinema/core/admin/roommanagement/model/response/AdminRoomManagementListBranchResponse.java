package nvm.project.qlcinema.core.admin.roommanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminRoomManagementListBranchResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

}
