package nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminAreaStatisticsManagementGetLineTicketAndRevenueRequest {

    private String areaId;

    private Integer year;

    private Integer month;

    private String dateStart;

    private String dateEnd;

    private String typeFilter;

}
