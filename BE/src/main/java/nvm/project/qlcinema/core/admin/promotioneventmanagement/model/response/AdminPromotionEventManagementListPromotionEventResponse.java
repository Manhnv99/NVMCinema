package nvm.project.qlcinema.core.admin.promotioneventmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface AdminPromotionEventManagementListPromotionEventResponse {

    @Value("#{target.Id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.dateStart}")
    LocalDate getDateStart();

    @Value("#{target.dateEnd}")
    LocalDate getDateEnd();

    @Value("#{target.promotionCode}")
    String getPromotionCode();

    @Value("#{target.promotionPrice}")
    BigDecimal getPromotionPrice();

    @Value("#{target.description}")
    String getDescription();

    @Value("#{target.imageUrl}")
    String getImageUrl();

    @Value("#{target.status}")
    String getStatus();

}
