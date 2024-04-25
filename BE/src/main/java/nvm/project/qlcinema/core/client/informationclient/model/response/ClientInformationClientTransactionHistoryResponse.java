package nvm.project.qlcinema.core.client.informationclient.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface ClientInformationClientTransactionHistoryResponse {

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.movie}")
    String getMovie();

    @Value("#{target.movieImage}")
    String getMovieImage();

    @Value("#{target.branch}")
    String getBranch();

    @Value("#{target.showtime}")
    String getShowTime();

    @Value("#{target.chair}")
    String getChair();

    @Value("#{target.food}")
    String getFood();

    @Value("#{target.totalPrice}")
    BigDecimal getTotalPrice();

    @Value("#{target.promotion}")
    BigDecimal getPromotion();

}
