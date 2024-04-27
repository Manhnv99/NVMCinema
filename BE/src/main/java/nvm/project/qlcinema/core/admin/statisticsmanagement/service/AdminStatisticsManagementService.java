package nvm.project.qlcinema.core.admin.statisticsmanagement.service;

import nvm.project.qlcinema.core.common.ResponseObject;

public interface AdminStatisticsManagementService {

    ResponseObject getRevenueForYear(String areaId);

    ResponseObject getRevenueForMonth(String areaId);

    ResponseObject getRevenueForToday(String areaId);

    ResponseObject getYear(String areaId);

    ResponseObject getMonth(int year, String areaId);

}
