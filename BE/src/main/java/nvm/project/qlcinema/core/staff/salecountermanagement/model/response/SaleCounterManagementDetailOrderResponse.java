package nvm.project.qlcinema.core.staff.salecountermanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;

public interface SaleCounterManagementDetailOrderResponse {

    @Value("#{target.orderCode}")
    String getOrderCode();

    @Value("#{target.dateBuy}")
    Date getDateBuy();

    @Value("#{target.branchName}")
    String getBranchName();

    @Value("#{target.branchAddress}")
    String getBranchAddress();

    @Value("#{target.screeningDate}")
    LocalDate getScreeningDate();

    @Value("#{target.timeStart}")
    Time getTimeStart();

    @Value("#{target.format}")
    String getFormat();

    @Value("#{target.movieName}")
    String getMovieName();

    @Value("#{target.food}")
    String getFood();

    @Value("#{target.chairName}")
    String getChairName();

    @Value("#{target.promotion}")
    BigDecimal getPromotion();

    @Value("#{target.totalPrice}")
    BigDecimal getTotalPrice();

}
