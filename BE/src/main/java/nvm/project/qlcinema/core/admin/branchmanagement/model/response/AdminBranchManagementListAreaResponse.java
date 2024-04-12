package nvm.project.qlcinema.core.admin.branchmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminBranchManagementListAreaResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

}
