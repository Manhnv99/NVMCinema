package nvm.project.qlcinema.core.admin.roommanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminRoomManagementGetOneRoomResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.branchId}")
    String getBranchId();

    @Value("#{target.totalChair}")
    Long getTotalChair();

}
