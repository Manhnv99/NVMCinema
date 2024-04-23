package nvm.project.qlcinema.core.admin.combofoodmanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.core.common.PageableRequest;

@Getter
@Setter
public class AdminComboFoodManagementListComboFoodRequest extends PageableRequest {

    private String inputSearch;

}
