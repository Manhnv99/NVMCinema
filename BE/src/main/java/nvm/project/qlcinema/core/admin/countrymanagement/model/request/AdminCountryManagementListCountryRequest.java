package nvm.project.qlcinema.core.admin.countrymanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.core.common.PageableRequest;

@Getter
@Setter
public class AdminCountryManagementListCountryRequest extends PageableRequest {

    private String inputSearch;

}
