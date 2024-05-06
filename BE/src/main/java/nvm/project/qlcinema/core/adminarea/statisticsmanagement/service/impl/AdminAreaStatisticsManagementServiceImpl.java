package nvm.project.qlcinema.core.adminarea.statisticsmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.request.AdminAreaStatisticsManagementGetLineTicketAndRevenueRequest;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.request.AdminAreaStatisticsManagementGetTopGenreAndTicketRequest;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.request.AdminAreaStatisticsManagementGetTopMovieAndTicketRequest;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.repository.AdminAreaStatisticsManagementRepository;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.service.AdminAreaStatisticsManagementService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminAreaStatisticsManagementServiceImpl implements AdminAreaStatisticsManagementService {

    private final AdminAreaStatisticsManagementRepository adminAreaStatisticsManagementRepository;

    @Override
    public ResponseObject getRevenueForYear(String areaId) {
        try {
            return new ResponseObject(adminAreaStatisticsManagementRepository.getRevenueForYear(areaId));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được doanh số theo năm!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getRevenueForMonth(String areaId) {
        try {
            return new ResponseObject(adminAreaStatisticsManagementRepository.getRevenueForMonth(areaId));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được doanh số theo tháng!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getRevenueForToday(String areaId) {
        try {
            return new ResponseObject(adminAreaStatisticsManagementRepository.getRevenueForToday(areaId));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được doanh số theo ngày!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getYear(String areaId) {
        try {
            return new ResponseObject(adminAreaStatisticsManagementRepository.getYear(areaId));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được năm!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getMonth(int year, String areaId) {
        try {
            return new ResponseObject(adminAreaStatisticsManagementRepository.getMonth(year, areaId));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được tháng!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getLineTicketAndRevenue(AdminAreaStatisticsManagementGetLineTicketAndRevenueRequest request) {
        try {
            return new ResponseObject(adminAreaStatisticsManagementRepository.getLineTicketAndRevenue(request));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được tổng số vé và doanh thu!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getTopMovieAndTicket(AdminAreaStatisticsManagementGetTopMovieAndTicketRequest request) {
        try {
            return new ResponseObject(adminAreaStatisticsManagementRepository.getTopMovieAndTicket(request));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được top bộ phim xem nhiều nhất!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getTopGenreAndTicket(AdminAreaStatisticsManagementGetTopGenreAndTicketRequest request) {
        try {
            return new ResponseObject(adminAreaStatisticsManagementRepository.getTopGenreAndTicket(request));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được top thể loại được xem nhiều nhất!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getTopComboFood(String areaId) {
        try {
            return new ResponseObject(adminAreaStatisticsManagementRepository.getTopComboFood(areaId));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được top combo food bán chạy nhất!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

}
