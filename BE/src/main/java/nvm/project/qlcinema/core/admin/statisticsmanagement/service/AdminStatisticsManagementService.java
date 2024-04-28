package nvm.project.qlcinema.core.admin.statisticsmanagement.service;

import nvm.project.qlcinema.core.admin.statisticsmanagement.model.request.AdminStatisticsManagementGetLineTicketAndRevenueRequest;
import nvm.project.qlcinema.core.admin.statisticsmanagement.model.request.AdminStatisticsManagementGetTopGenreAndTicketRequest;
import nvm.project.qlcinema.core.admin.statisticsmanagement.model.request.AdminStatisticsManagementGetTopMovieAndTicketRequest;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface AdminStatisticsManagementService {

    ResponseObject getRevenueForYear(String areaId);

    ResponseObject getRevenueForMonth(String areaId);

    ResponseObject getRevenueForToday(String areaId);

    ResponseObject getYear(String areaId);

    ResponseObject getMonth(int year, String areaId);

    ResponseObject getAllArea();

    ResponseObject getLineTicketAndRevenue(
            AdminStatisticsManagementGetLineTicketAndRevenueRequest request
    );

    ResponseObject getTopMovieAndTicket(AdminStatisticsManagementGetTopMovieAndTicketRequest request);

    ResponseObject getTopGenreAndTicket(AdminStatisticsManagementGetTopGenreAndTicketRequest request);

    ResponseObject getTopComboFood(String areaId);

}
