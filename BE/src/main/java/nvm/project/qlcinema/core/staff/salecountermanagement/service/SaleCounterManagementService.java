package nvm.project.qlcinema.core.staff.salecountermanagement.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.request.SaleCounterManagementBookChairCashPaymentRequest;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.request.SaleCounterManagementBookChairPaymentRequest;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.request.SaleCounterManagementBookTicketListShowTimeRequest;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.request.SaleCounterManagementListMovieRequest;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.response.SaleCounterManagementBookChairCashPaymentResponse;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.response.SaleCounterManagementListMovieResponse;

import java.io.IOException;

public interface SaleCounterManagementService {

    PageableObject<SaleCounterManagementListMovieResponse> getSearchListMovie(SaleCounterManagementListMovieRequest request);

    ResponseObject getListCountry();

    ResponseObject getListDirector();

    ResponseObject getListFormat();

    ResponseObject getListGenre();

    ResponseObject getListShowTime(SaleCounterManagementBookTicketListShowTimeRequest request);

    ResponseObject getDetailShowTime(String showTimeId);

    ResponseObject getListTicketChair(String showTimeId);

    ResponseObject getListComboFood();

    ResponseObject getPromotionEvent(String code);

    SaleCounterManagementBookChairCashPaymentResponse cashPayment(SaleCounterManagementBookChairCashPaymentRequest paymentRequest) throws IOException;

    String startOnlineBanking(SaleCounterManagementBookChairPaymentRequest paymentRequest, String urlReturn);

    void onlineBankingReturn(HttpServletRequest request, HttpServletResponse response) throws IOException;

}
