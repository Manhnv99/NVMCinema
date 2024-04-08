package nvm.project.qlcinema.core.admin.formatmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminFormatManagementListFormatResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.deleted}")
    boolean getDeleted();

}
