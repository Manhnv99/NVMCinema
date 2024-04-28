package nvm.project.qlcinema.core.admin.statisticsmanagement.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminStatisticsManagementGetTopMovieAndTicketRequest {

    private String areaId;

    private Integer top;

}
