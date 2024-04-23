package nvm.project.qlcinema.core.admin.combofoodmanagement.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.combofoodmanagement.model.request.AdminComboFoodManagementListComboFoodRequest;
import nvm.project.qlcinema.core.admin.combofoodmanagement.model.request.AdminComboFoodManagementPostRequest;
import nvm.project.qlcinema.core.admin.combofoodmanagement.model.request.AdminComboFoodManagementPutRequest;
import nvm.project.qlcinema.core.admin.combofoodmanagement.model.response.AdminComboFoodManagementListComboFoodResponse;
import nvm.project.qlcinema.core.admin.combofoodmanagement.service.AdminComboFoodManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlPath.URL_API_ADMIN_COMBO_FOOD_MANAGEMENT)
public class AdminComboFoodManagementController {

    private final AdminComboFoodManagementService adminComboFoodManagementService;

    @GetMapping("/get-search-combo-food")
    public PageableObject<AdminComboFoodManagementListComboFoodResponse> getListComboFood(final AdminComboFoodManagementListComboFoodRequest request){
        return adminComboFoodManagementService.getListComboFood(request);
    }

    @GetMapping("/get-detail-combo-food/{comboFoodId}")
    public ResponseObject getDetailComboFood(@PathVariable String comboFoodId){
        return adminComboFoodManagementService.getDetailComboFood(comboFoodId);
    }

    @PostMapping("/post-combo-food")
    public ResponseObject postComboFood(@ModelAttribute @Valid AdminComboFoodManagementPostRequest postRequest) throws IOException {
        return adminComboFoodManagementService.postComboFood(postRequest);
    }

    @PutMapping("/put-combo-food")
    public ResponseObject putComboFood(@ModelAttribute @Valid AdminComboFoodManagementPutRequest putRequest) throws IOException {
        return adminComboFoodManagementService.putComboFood(putRequest);
    }

    @DeleteMapping("/delete-combo-food/{comboFoodId}")
    public ResponseObject deleteComboFood(@PathVariable String comboFoodId){
        return adminComboFoodManagementService.deleteComboFood(comboFoodId);
    }

}
