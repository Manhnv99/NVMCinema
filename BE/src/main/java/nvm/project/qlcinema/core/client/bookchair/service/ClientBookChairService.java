package nvm.project.qlcinema.core.client.bookchair.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import nvm.project.qlcinema.core.client.bookchair.model.request.ClientBookChairPaymentRequest;
import nvm.project.qlcinema.core.common.ResponseObject;

import java.io.IOException;

public interface ClientBookChairService {

    ResponseObject getDetailShowTime(String showTimeId);

    ResponseObject getListTicketChair(String showTimeId);

    ResponseObject getListComboFood();

    ResponseObject getPromotionEvent(String code);

    String startOnlineBanking(ClientBookChairPaymentRequest paymentRequest, String urlReturn, String domainIP);

    void onlineBankingReturn(HttpServletRequest request, HttpServletResponse response) throws IOException;

}
