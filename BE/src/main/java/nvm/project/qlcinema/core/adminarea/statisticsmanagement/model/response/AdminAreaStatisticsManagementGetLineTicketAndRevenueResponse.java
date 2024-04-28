package nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface AdminAreaStatisticsManagementGetLineTicketAndRevenueResponse {

    @Value("#{target.ticketSold}")
    Long getTicketSold();

    @Value("#{target.totalRevenue}")
    BigDecimal getTotalRevenue();

    @Value("#{target.date}")
    String getDate();

}
