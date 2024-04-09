package nvm.project.qlcinema.core.admin.countrymanagement.service;

import nvm.project.qlcinema.core.admin.countrymanagement.model.request.AdminCountryManagementListCountryRequest;
import nvm.project.qlcinema.core.admin.countrymanagement.model.request.AdminCountryManagementPostRequest;
import nvm.project.qlcinema.core.admin.countrymanagement.model.request.AdminCountryManagementPutRequest;
import nvm.project.qlcinema.core.admin.countrymanagement.model.response.AdminCountryManagementListCountryResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface AdminCountryManagementService {

    PageableObject<AdminCountryManagementListCountryResponse> getListCountry(AdminCountryManagementListCountryRequest request);

    ResponseObject postCountry(AdminCountryManagementPostRequest postRequest);

    ResponseObject putCountry(AdminCountryManagementPutRequest putRequest);

    ResponseObject deleteCountry(String countryId);

    ResponseObject getDetailCountry(String countryId);


}
