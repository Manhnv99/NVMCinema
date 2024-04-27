package nvm.project.qlcinema.core.admin.ordermanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface    AdminOrderManagementListOrderResponse {

    @Value("#{target.orderCode}")
    String getOrderCode();

    @Value("#{target.clientCode}")
    String getClientCode();

    @Value("#{target.clientName}")
    String getClientName();

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
