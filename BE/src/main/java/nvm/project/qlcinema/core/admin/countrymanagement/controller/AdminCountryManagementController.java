package nvm.project.qlcinema.core.admin.countrymanagement.controller;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.countrymanagement.model.request.AdminCountryManagementListCountryRequest;
import nvm.project.qlcinema.core.admin.countrymanagement.model.request.AdminCountryManagementPostRequest;
import nvm.project.qlcinema.core.admin.countrymanagement.model.request.AdminCountryManagementPutRequest;
import nvm.project.qlcinema.core.admin.countrymanagement.model.response.AdminCountryManagementListCountryResponse;
import nvm.project.qlcinema.core.admin.countrymanagement.service.AdminCountryManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(UrlPath.URL_API_ADMIN_COUNTRY_MANAGEMENT)
@RequiredArgsConstructor
public class AdminCountryManagementController {

    private final AdminCountryManagementService adminCountryManagementService;

    @GetMapping("/get-search-country")
    public PageableObject<AdminCountryManagementListCountryResponse> getListCountry(final AdminCountryManagementListCountryRequest request){
        return adminCountryManagementService.getListCountry(request);
    }

    @GetMapping("/get-detail-country/{countryId}")
    public ResponseObject getDetailCountry(@PathVariable String countryId){
        return adminCountryManagementService.getDetailCountry(countryId);
    }

    @PostMapping("/post-country")
    public ResponseObject postCountry(@RequestBody AdminCountryManagementPostRequest postRequest){
        return adminCountryManagementService.postCountry(postRequest);
    }

    @PutMapping("/put-country")
    public ResponseObject putCountry(@RequestBody AdminCountryManagementPutRequest putRequest){
        return adminCountryManagementService.putCountry(putRequest);
    }

    @DeleteMapping("/delete-country/{countryId}")
    public ResponseObject deleteCountry(@PathVariable String countryId){
        return adminCountryManagementService.deleteCountry(countryId);
    }

}
