package nvm.project.qlcinema.core.client.promotionevent.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;

public interface ClientPromotionEventDetailPromotionEventResponse {

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.promotionCode}")
    String getPromotionCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.dateStart}")
    LocalDate getDateStart();

    @Value("#{target.dateEnd}")
    LocalDate getDateEnd();

    @Value("#{target.description}")
    String getDescription();

}
