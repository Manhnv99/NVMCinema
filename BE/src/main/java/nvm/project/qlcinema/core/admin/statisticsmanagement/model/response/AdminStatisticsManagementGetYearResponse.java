package nvm.project.qlcinema.core.admin.statisticsmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminStatisticsManagementGetYearResponse {

    @Value("#{target.year}")
    int getYear();

}
