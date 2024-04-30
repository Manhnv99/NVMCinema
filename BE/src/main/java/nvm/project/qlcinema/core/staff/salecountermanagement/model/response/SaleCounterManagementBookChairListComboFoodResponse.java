package nvm.project.qlcinema.core.staff.salecountermanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface SaleCounterManagementBookChairListComboFoodResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.price}")
    BigDecimal getPrice();

    @Value("#{target.imageUrl}")
    String getImageUrl();

}
