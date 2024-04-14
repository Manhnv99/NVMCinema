package nvm.project.qlcinema.core.admin.roommanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminRoomManagementDetailRoomResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.branch}")
    String getBranch();

    @Value("#{target.area}")
    String getArea();

    @Value("#{target.totalChair}")
    Long getTotalChair();

    @Value("#{target.deleted}")
    boolean getDeleted();

}
