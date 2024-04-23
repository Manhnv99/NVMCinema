package nvm.project.qlcinema.core.client.bookticket.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.sql.Time;

public interface ClientBookTicketListShowtimeResponse {

    @Value("#{target.showTimeId}")
    String getShowTimeId();

    @Value("#{target.branchId}")
    String getBranchId();

    @Value("#{target.timeStart}")
    Time getTimeStart();

    @Value("#{target.format}")
    String getFormat();

    @Value("#{target.subTitle}")
    String getSubTitle();

    @Value("#{target.roomName}")
    String getRoomName();

}
