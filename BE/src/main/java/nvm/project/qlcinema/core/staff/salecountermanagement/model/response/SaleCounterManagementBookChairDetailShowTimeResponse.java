package nvm.project.qlcinema.core.staff.salecountermanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.sql.Time;
import java.time.LocalDate;

public interface SaleCounterManagementBookChairDetailShowTimeResponse {

    @Value("#{target.showTimeId}")
    String getShowTimeId();

    @Value("#{target.branchName}")
    String getBranchName();

    @Value("#{target.roomName}")
    String getRoomName();

    @Value("#{target.screeningDate}")
    LocalDate getScreeningDate();

    @Value("#{target.timeStart}")
    Time getTimeStart();

    @Value("#{target.movieName}")
    String getMovieName();

    @Value("#{target.ageRestriction}")
    String getAgeRestriction();

    @Value("#{target.subTitle}")
    String getSubtitle();

    @Value("#{target.format}")
    String getFormat();

}
