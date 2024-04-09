package nvm.project.qlcinema.core.admin.countrymanagement.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminCountryManagementPutRequest extends AdminCountryManagementPostRequest {

    private String countryId;

}
