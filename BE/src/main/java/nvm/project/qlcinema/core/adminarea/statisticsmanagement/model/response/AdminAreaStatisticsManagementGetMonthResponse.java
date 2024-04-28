package nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminAreaStatisticsManagementGetMonthResponse {

    @Value("#{target.month}")
    int getMonth();

}
