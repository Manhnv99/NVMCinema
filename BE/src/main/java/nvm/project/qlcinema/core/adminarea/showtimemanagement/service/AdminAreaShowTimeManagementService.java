package nvm.project.qlcinema.core.adminarea.showtimemanagement.service;

import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.request.AdminAreaShowTimeManagementListShowTimeRequest;
import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.request.AdminAreaShowTimeManagementPostRequest;
import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.request.AdminAreaShowTimeManagementPutRequest;
import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.response.AdminAreaShowTimeManagementListShowTimeResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

import java.text.ParseException;

public interface AdminAreaShowTimeManagementService {

    PageableObject<AdminAreaShowTimeManagementListShowTimeResponse> getListSearchShowTime(AdminAreaShowTimeManagementListShowTimeRequest request);

    ResponseObject getOneShowTime(String id);

    ResponseObject getDetailShowTime(String id);

    ResponseObject getListTicketChair(String showTimeId);

    ResponseObject getListBranch(String areaId);

    ResponseObject getListRoom(String branchId);

    ResponseObject getListMovieCurrentShowing();

    ResponseObject getListMoviePreTicket();

    ResponseObject postShowTime(AdminAreaShowTimeManagementPostRequest postRequest) throws ParseException;

    ResponseObject putShowTime(AdminAreaShowTimeManagementPutRequest putRequest) throws ParseException;

}
