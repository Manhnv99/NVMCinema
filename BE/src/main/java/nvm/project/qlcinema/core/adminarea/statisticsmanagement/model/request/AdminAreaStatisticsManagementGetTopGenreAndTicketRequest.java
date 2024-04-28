package nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminAreaStatisticsManagementGetTopGenreAndTicketRequest {

    private String areaId;

    private Integer top;

}
