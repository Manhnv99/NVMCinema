package nvm.project.qlcinema.core.staff.salecountermanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface SaleCounterManagementGetClosestScreeningDateResponse {

    @Value("#{target.screeningDate}")
    String getScreeningDate();

}
