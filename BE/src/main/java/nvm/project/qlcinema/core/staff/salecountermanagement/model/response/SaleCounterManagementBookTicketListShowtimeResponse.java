package nvm.project.qlcinema.core.staff.salecountermanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.sql.Time;

public interface SaleCounterManagementBookTicketListShowtimeResponse {

    @Value("#{target.showTimeId}")
    String getShowTimeId();

    @Value("#{target.timeStart}")
    Time getTimeStart();

    @Value("#{target.format}")
    String getFormat();

    @Value("#{target.subTitle}")
    String getSubTitle();

    @Value("#{target.roomName}")
    String getRoomName();

}
