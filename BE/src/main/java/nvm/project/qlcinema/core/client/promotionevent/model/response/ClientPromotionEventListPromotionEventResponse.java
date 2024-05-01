package nvm.project.qlcinema.core.client.promotionevent.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;

public interface ClientPromotionEventListPromotionEventResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.dateStart}")
    LocalDate getDateStart();

    @Value("#{target.dateEnd}")
    LocalDate getDateEnd();

}
