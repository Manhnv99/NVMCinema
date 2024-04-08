package nvm.project.qlcinema.core.admin.countrymanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminCountryManagementListCountryResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.deleted}")
    boolean getDeleted();

}
