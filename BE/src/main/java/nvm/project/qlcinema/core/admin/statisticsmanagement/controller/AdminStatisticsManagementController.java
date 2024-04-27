package nvm.project.qlcinema.core.admin.statisticsmanagement.controller;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.statisticsmanagement.model.request.AdminStatisticsManagementGetTopMovieAndTicketRequest;
import nvm.project.qlcinema.core.admin.statisticsmanagement.service.AdminStatisticsManagementService;
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
@RequestMapping(UrlPath.URL_API_ADMIN_STATISTICS_MANAGEMENT)
@RequiredArgsConstructor
public class AdminStatisticsManagementController {

    private final AdminStatisticsManagementService adminStatisticsManagementService;

    @GetMapping("/statistics-revenue-for-year/{areaId}")
    public ResponseObject getRevenueForYear(@PathVariable String areaId){
        return adminStatisticsManagementService.getRevenueForYear(areaId);
    }

    @GetMapping("/statistics-revenue-for-month/{areaId}")
    public ResponseObject getRevenueForMonth(@PathVariable String areaId){
        return adminStatisticsManagementService.getRevenueForMonth(areaId);
    }

    @GetMapping("/statistics-revenue-for-today/{areaId}")
    public ResponseObject getRevenueForToday(@PathVariable String areaId){
        return adminStatisticsManagementService.getRevenueForToday(areaId);
    }

    @GetMapping("/statistics-get-year")
    public ResponseObject getYear(@RequestParam(name = "areaId") String areaId){
        return adminStatisticsManagementService.getYear(areaId);
    }

    @GetMapping("/statistics-get-month")
    public ResponseObject getMonth(@RequestParam(name = "areaId") String areaId,
                                   @RequestParam(name = "year") int year){
        return adminStatisticsManagementService.getMonth(year,areaId);
    }

    @GetMapping("/statistics-top-movie-and-ticket")
    public ResponseObject getTopMovieAndTicket(final AdminStatisticsManagementGetTopMovieAndTicketRequest request){
        System.out.println(request.getAreaId());
        System.out.println(request.getTop());
        System.out.println(request.getYear());
        System.out.println(request.getMonth());
        System.out.println(request.getDateStart());
        System.out.println(request.getDateEnd());
        return adminStatisticsManagementService.getTopMovieAndTicket(request);
    }

}
