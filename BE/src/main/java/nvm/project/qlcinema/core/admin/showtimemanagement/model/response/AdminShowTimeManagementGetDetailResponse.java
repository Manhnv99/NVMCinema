package nvm.project.qlcinema.core.admin.showtimemanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.sql.Time;
import java.time.LocalDate;

public interface AdminShowTimeManagementGetDetailResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.movie}")
    String getMovie();

    @Value("#{target.room}")
    String getRoom();

    @Value("#{target.branch}")
    String getBranch();

    @Value("#{target.area}")
    String getArea();

    @Value("#{target.screeningDate}")
    LocalDate getScreeningDate();

    @Value("#{target.timeStart}")
    Time getTimeStart();

    @Value("#{target.ticketPrice}")
    BigDecimal getTicketPrice();

    @Value("#{target.ticketBooked}")
    Integer ticketBooked();

    @Value("#{target.ticketNotBooked}")
    Integer ticketNotBooked();

}
