package nvm.project.qlcinema.core.admin.statisticsmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface AdminStatisticsManagementGetRevenueResponse {

    @Value("#{target.ticketSold}")
    Long getTicketSold();

    @Value("#{target.totalRevenue}")
    BigDecimal getTotalRevenue();

}
