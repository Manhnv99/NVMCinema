package nvm.project.qlcinema.core.admin.statisticsmanagement.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminStatisticsManagementGetLineTicketAndRevenueRequest {

    private String areaId;

    private Integer year;

    private Integer month;

    private String dateStart;

    private String dateEnd;

    private String typeFilter;

}
