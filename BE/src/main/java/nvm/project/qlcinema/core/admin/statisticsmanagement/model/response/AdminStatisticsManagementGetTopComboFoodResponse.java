package nvm.project.qlcinema.core.admin.statisticsmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface AdminStatisticsManagementGetTopComboFoodResponse {

    @Value("#{target.comboSold}")
    Long getComboSold();

    @Value("#{target.totalRevenue}")
    BigDecimal getTotalRevenue();

    @Value("#{target.comboName}")
    String getComboName();

}
