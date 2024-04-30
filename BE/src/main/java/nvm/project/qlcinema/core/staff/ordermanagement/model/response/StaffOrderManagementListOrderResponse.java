package nvm.project.qlcinema.core.staff.ordermanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface StaffOrderManagementListOrderResponse {

    @Value("#{target.orderId}")
    String getOrderId();

    @Value("#{target.movieImage}")
    String getMovieImage();

    @Value("#{target.orderCode}")
    String getOrderCode();

    @Value("#{target.clientCode}")
    String getClientCode();

    @Value("#{target.clientName}")
    String getClientName();

    @Value("#{target.movie}")
    String getMovie();

    @Value("#{target.showtime}")
    String getShowTime();

    @Value("#{target.chair}")
    String getChair();

    @Value("#{target.food}")
    String getFood();

    @Value("#{target.promotion}")
    BigDecimal getPromotion();

    @Value("#{target.totalPrice}")
    BigDecimal getTotalPrice();

    @Value("#{target.onlineOrOffline}")
    String getOnlineOrOffline();

    @Value("#{target.userCode}")
    String getUserCode();

    @Value("#{target.orderStatus}")
    String getOrderStatus();

}
