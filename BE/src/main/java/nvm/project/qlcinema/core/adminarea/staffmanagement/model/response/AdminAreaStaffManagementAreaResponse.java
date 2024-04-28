package nvm.project.qlcinema.core.adminarea.staffmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminAreaStaffManagementAreaResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

}
