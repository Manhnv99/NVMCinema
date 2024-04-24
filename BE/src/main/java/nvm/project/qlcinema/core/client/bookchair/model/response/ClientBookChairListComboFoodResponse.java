package nvm.project.qlcinema.core.client.bookchair.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface ClientBookChairListComboFoodResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.price}")
    BigDecimal getPrice();

    @Value("#{target.imageUrl}")
    String getImageUrl();

}
