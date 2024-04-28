package nvm.project.qlcinema.core.admin.statisticsmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.statisticsmanagement.model.request.AdminStatisticsManagementGetLineTicketAndRevenueRequest;
import nvm.project.qlcinema.core.admin.statisticsmanagement.model.request.AdminStatisticsManagementGetTopGenreAndTicketRequest;
import nvm.project.qlcinema.core.admin.statisticsmanagement.model.request.AdminStatisticsManagementGetTopMovieAndTicketRequest;
import nvm.project.qlcinema.core.admin.statisticsmanagement.repository.AdminStatisticsManagementAreaRepository;
import nvm.project.qlcinema.core.admin.statisticsmanagement.repository.AdminStatisticsManagementRepository;
import nvm.project.qlcinema.core.admin.statisticsmanagement.service.AdminStatisticsManagementService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminStatisticsManagementServiceImpl implements AdminStatisticsManagementService {

    private final AdminStatisticsManagementRepository adminStatisticsManagementRepository;

    private final AdminStatisticsManagementAreaRepository adminStatisticsManagementAreaRepository;

    @Override
    public ResponseObject getRevenueForYear(String areaId) {
        try{
            return new ResponseObject(adminStatisticsManagementRepository.getRevenueForYear(areaId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được doanh số theo năm!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getRevenueForMonth(String areaId) {
        try{
            return new ResponseObject(adminStatisticsManagementRepository.getRevenueForMonth(areaId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được doanh số theo tháng!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getRevenueForToday(String areaId) {
        try{
            return new ResponseObject(adminStatisticsManagementRepository.getRevenueForToday(areaId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được doanh số theo ngày!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getYear(String areaId) {
        try{
            return new ResponseObject(adminStatisticsManagementRepository.getYear(areaId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được năm!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getMonth(int year, String areaId) {
        try{
            return new ResponseObject(adminStatisticsManagementRepository.getMonth(year,areaId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được tháng!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getAllArea() {
        try{
            return new ResponseObject(adminStatisticsManagementAreaRepository.getAllArea());
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách khu vực!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getLineTicketAndRevenue(AdminStatisticsManagementGetLineTicketAndRevenueRequest request) {
        try{
            return new ResponseObject(adminStatisticsManagementRepository.getLineTicketAndRevenue(request));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được tổng số vé và doanh thu!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getTopMovieAndTicket(AdminStatisticsManagementGetTopMovieAndTicketRequest request) {
        try{
            return new ResponseObject(adminStatisticsManagementRepository.getTopMovieAndTicket(request));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được top bộ phim xem nhiều nhất!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getTopGenreAndTicket(AdminStatisticsManagementGetTopGenreAndTicketRequest request) {
        try{
            return new ResponseObject(adminStatisticsManagementRepository.getTopGenreAndTicket(request));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được top thể loại được xem nhiều nhất!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getTopComboFood(String areaId) {
        try{
            return new ResponseObject(adminStatisticsManagementRepository.getTopComboFood(areaId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được top combo food bán chạy nhất!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

}
