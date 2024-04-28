package nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface AdminAreaStatisticsManagementGetTopMovieAndTicketResponse {

    @Value("#{target.ticketSold}")
    Long getTicketSold();

    @Value("#{target.totalRevenue}")
    BigDecimal getTotalRevenue();

    @Value("#{target.movieName}")
    String getMovieName();

}
