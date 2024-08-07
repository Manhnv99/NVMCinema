package nvm.project.qlcinema.core.admin.staffmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminStaffManagementAreaResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

}
