package nvm.project.qlcinema.core.admin.showtimemanagement.service;

import nvm.project.qlcinema.core.admin.showtimemanagement.model.request.AdminShowTimeManagementListShowTimeRequest;
import nvm.project.qlcinema.core.admin.showtimemanagement.model.request.AdminShowTimeManagementPostRequest;
import nvm.project.qlcinema.core.admin.showtimemanagement.model.request.AdminShowTimeManagementPutRequest;
import nvm.project.qlcinema.core.admin.showtimemanagement.model.response.AdminShowTimeManagementListShowTimeResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

import java.text.ParseException;

public interface AdminShowTimeManagementService {

    PageableObject<AdminShowTimeManagementListShowTimeResponse> getListSearchShowTime(AdminShowTimeManagementListShowTimeRequest request);

    ResponseObject getOneShowTime(String id);

    ResponseObject getDetailShowTime(String id);

    ResponseObject getListTicketChair(String showTimeId);

    ResponseObject getListArea();

    ResponseObject getListBranch(String areaId);

    ResponseObject getListRoom(String branchId);

    ResponseObject postShowTime(AdminShowTimeManagementPostRequest postRequest) throws ParseException;

    ResponseObject putShowTime(AdminShowTimeManagementPutRequest putRequest) throws ParseException;

}
