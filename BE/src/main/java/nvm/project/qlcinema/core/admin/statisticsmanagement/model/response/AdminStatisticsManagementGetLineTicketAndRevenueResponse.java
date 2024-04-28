package nvm.project.qlcinema.core.admin.statisticsmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface AdminStatisticsManagementGetLineTicketAndRevenueResponse {

    @Value("#{target.ticketSold}")
    Long getTicketSold();

    @Value("#{target.totalRevenue}")
    BigDecimal getTotalRevenue();

    @Value("#{target.date}")
    String getDate();

}
