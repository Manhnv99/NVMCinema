package nvm.project.qlcinema.core.adminarea.statisticsmanagement.controller;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.request.AdminAreaStatisticsManagementGetLineTicketAndRevenueRequest;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.request.AdminAreaStatisticsManagementGetTopGenreAndTicketRequest;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.request.AdminAreaStatisticsManagementGetTopMovieAndTicketRequest;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.service.AdminAreaStatisticsManagementService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(UrlPath.URL_API_ADMIN_AREA_STATISTICS_MANAGEMENT)
@RequiredArgsConstructor
public class AdminAreaStatisticsManagementController {

    private final AdminAreaStatisticsManagementService adminAreaStatisticsManagementService;

    @GetMapping("/statistics-revenue-for-year/{areaId}")
    public ResponseObject getRevenueForYear(@PathVariable String areaId){
        return adminAreaStatisticsManagementService.getRevenueForYear(areaId);
    }

    @GetMapping("/statistics-revenue-for-month/{areaId}")
    public ResponseObject getRevenueForMonth(@PathVariable String areaId){
        return adminAreaStatisticsManagementService.getRevenueForMonth(areaId);
    }

    @GetMapping("/statistics-revenue-for-today/{areaId}")
    public ResponseObject getRevenueForToday(@PathVariable String areaId){
        return adminAreaStatisticsManagementService.getRevenueForToday(areaId);
    }

    @GetMapping("/statistics-get-year")
    public ResponseObject getYear(@RequestParam(name = "areaId") String areaId){
        return adminAreaStatisticsManagementService.getYear(areaId);
    }

    @GetMapping("/statistics-get-month")
    public ResponseObject getMonth(@RequestParam(name = "areaId") String areaId,
                                   @RequestParam(name = "year") int year){
        return adminAreaStatisticsManagementService.getMonth(year,areaId);
    }

    @GetMapping("/statistics-line-ticket-revenue")
    public ResponseObject getLineTicketAndRevenue(final AdminAreaStatisticsManagementGetLineTicketAndRevenueRequest request){
        return adminAreaStatisticsManagementService.getLineTicketAndRevenue(request);
    }

    @GetMapping("/statistics-top-movie-and-ticket")
    public ResponseObject getTopMovieAndTicket(final AdminAreaStatisticsManagementGetTopMovieAndTicketRequest request){
        return adminAreaStatisticsManagementService.getTopMovieAndTicket(request);
    }

    @GetMapping("/statistics-top-genre-and-ticket")
    public ResponseObject getTopGenreAndTicket(final AdminAreaStatisticsManagementGetTopGenreAndTicketRequest request){
        return adminAreaStatisticsManagementService.getTopGenreAndTicket(request);
    }

    @GetMapping("/statistics-top-combo-food")
    public ResponseObject getTopComboFood(@RequestParam(name = "areaId") String areaId){
        return adminAreaStatisticsManagementService.getTopComboFood(areaId);
    }

}
