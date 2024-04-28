package nvm.project.qlcinema.core.adminarea.statisticsmanagement.service;

import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.request.AdminAreaStatisticsManagementGetLineTicketAndRevenueRequest;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.request.AdminAreaStatisticsManagementGetTopGenreAndTicketRequest;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.request.AdminAreaStatisticsManagementGetTopMovieAndTicketRequest;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface AdminAreaStatisticsManagementService {

    ResponseObject getRevenueForYear(String areaId);

    ResponseObject getRevenueForMonth(String areaId);

    ResponseObject getRevenueForToday(String areaId);

    ResponseObject getYear(String areaId);

    ResponseObject getMonth(int year, String areaId);

    ResponseObject getLineTicketAndRevenue(
            AdminAreaStatisticsManagementGetLineTicketAndRevenueRequest request
    );

    ResponseObject getTopMovieAndTicket(AdminAreaStatisticsManagementGetTopMovieAndTicketRequest request);

    ResponseObject getTopGenreAndTicket(AdminAreaStatisticsManagementGetTopGenreAndTicketRequest request);

    ResponseObject getTopComboFood(String areaId);

}
