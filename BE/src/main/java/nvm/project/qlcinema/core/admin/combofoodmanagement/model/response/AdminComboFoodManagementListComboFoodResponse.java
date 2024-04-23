package nvm.project.qlcinema.core.admin.combofoodmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface AdminComboFoodManagementListComboFoodResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.price}")
    BigDecimal getPrice();

    @Value("#{target.imageUrl}")
    String getImageUrl();

    @Value("#{target.deleted}")
    boolean getDeleted();

}
