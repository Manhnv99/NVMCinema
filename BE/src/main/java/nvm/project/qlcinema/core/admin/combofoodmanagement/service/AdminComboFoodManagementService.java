package nvm.project.qlcinema.core.admin.combofoodmanagement.service;

import nvm.project.qlcinema.core.admin.combofoodmanagement.model.request.AdminComboFoodManagementListComboFoodRequest;
import nvm.project.qlcinema.core.admin.combofoodmanagement.model.request.AdminComboFoodManagementPostRequest;
import nvm.project.qlcinema.core.admin.combofoodmanagement.model.request.AdminComboFoodManagementPutRequest;
import nvm.project.qlcinema.core.admin.combofoodmanagement.model.response.AdminComboFoodManagementListComboFoodResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

import java.io.IOException;

public interface AdminComboFoodManagementService {

    PageableObject<AdminComboFoodManagementListComboFoodResponse> getListComboFood(AdminComboFoodManagementListComboFoodRequest request);

    ResponseObject postComboFood(AdminComboFoodManagementPostRequest postRequest) throws IOException;

    ResponseObject putComboFood(AdminComboFoodManagementPutRequest putRequest) throws IOException;

    ResponseObject deleteComboFood(String comboFoodId);

    ResponseObject getDetailComboFood(String comboFoodId);

}
