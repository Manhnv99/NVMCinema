package nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminAreaStatisticsManagementGetYearResponse {

    @Value("#{target.year}")
    int getYear();

}
