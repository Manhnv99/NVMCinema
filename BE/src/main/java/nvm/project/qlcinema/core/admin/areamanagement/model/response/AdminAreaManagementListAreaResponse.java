package nvm.project.qlcinema.core.admin.areamanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminAreaManagementListAreaResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.deleted}")
    boolean getDeleted();

}
