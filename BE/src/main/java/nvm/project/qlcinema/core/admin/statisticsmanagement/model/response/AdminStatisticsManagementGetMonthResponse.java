package nvm.project.qlcinema.core.admin.statisticsmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminStatisticsManagementGetMonthResponse {

    @Value("#{target.month}")
    int getMonth();

}
