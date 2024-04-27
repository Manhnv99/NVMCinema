package nvm.project.qlcinema.core.admin.statisticsmanagement.model.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AdminStatisticsManagementGetTopMovieAndTicketRequest {

    private String areaId;

    private int top;

    private String year;

    private String month;

    private String dateStart;

    private String dateEnd;

}
