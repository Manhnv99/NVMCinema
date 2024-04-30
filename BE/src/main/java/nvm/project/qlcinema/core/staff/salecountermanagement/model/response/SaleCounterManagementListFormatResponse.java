package nvm.project.qlcinema.core.staff.salecountermanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface SaleCounterManagementListFormatResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

}
