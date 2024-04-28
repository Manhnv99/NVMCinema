package nvm.project.qlcinema.core.adminarea.showtimemanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.sql.Time;
import java.time.LocalDate;

public interface AdminAreaShowTimeManagementGetOneResponse {

    @Value("#{target.screeningDate}")
    LocalDate getScreeningDate();

    @Value("#{target.timeStart}")
    Time getTimeStart();

    @Value("#{target.ticketPrice}")
    BigDecimal getTicketPrice();

    @Value("#{target.roomId}")
    String getRoomId();

    @Value("#{target.branchId}")
    String getBranchId();

    @Value("#{target.areaId}")
    String getAreaId();

    @Value("#{target.movieId}")
    String getMovieId();

}
