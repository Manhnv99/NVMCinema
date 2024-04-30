package nvm.project.qlcinema.core.staff.salecountermanagement.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.request.SaleCounterManagementBookChairCashPaymentRequest;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.request.SaleCounterManagementBookChairPaymentRequest;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.request.SaleCounterManagementBookTicketListShowTimeRequest;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.request.SaleCounterManagementListMovieRequest;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.response.SaleCounterManagementBookChairCashPaymentResponse;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.response.SaleCounterManagementListMovieResponse;
import nvm.project.qlcinema.core.staff.salecountermanagement.service.SaleCounterManagementService;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin("*")
@RequestMapping(UrlPath.URL_API_STAFF_SALE_COUNTER_MANAGEMENT)
@RestController
@RequiredArgsConstructor
public class SaleCounterManagementController {

    private final SaleCounterManagementService saleCounterManagementService;

    @GetMapping("/get-search-movie")
    public PageableObject<SaleCounterManagementListMovieResponse> getSearchListMovie(final SaleCounterManagementListMovieRequest request){
        return saleCounterManagementService.getSearchListMovie(request);
    }

    @GetMapping("/get-list-country")
    public ResponseObject getListCountry(){
        return saleCounterManagementService.getListCountry();
    }

    @GetMapping("/get-list-director")
    public ResponseObject getListDirector(){
        return saleCounterManagementService.getListDirector();
    }

    @GetMapping("/get-list-genre")
    public ResponseObject getListGenre(){
        return saleCounterManagementService.getListGenre();
    }

    @GetMapping("/get-list-format")
    public ResponseObject getListFormat(){
        return saleCounterManagementService.getListFormat();
    }

    @GetMapping("/list-show-time")
    public ResponseObject getListShowTime(final SaleCounterManagementBookTicketListShowTimeRequest request){
        return saleCounterManagementService.getListShowTime(request);
    }

    @GetMapping("/detail-showtime/{showTimeId}")
    public ResponseObject getDetailShowTime(@PathVariable String showTimeId){
        return saleCounterManagementService.getDetailShowTime(showTimeId);
    }

    @GetMapping("/list-ticket-chair/{showTimeId}")
    public ResponseObject getListTicketChair(@PathVariable String showTimeId){
        return saleCounterManagementService.getListTicketChair(showTimeId);
    }

    @GetMapping("/list-combo-food")
    public ResponseObject getListComboFood(){
        return saleCounterManagementService.getListComboFood();
    }

    @GetMapping("/get-pme-price")
    public ResponseObject getPromotionEvent(@RequestParam(name = "code",required = false) String code){
        return saleCounterManagementService.getPromotionEvent(code);
    }

    @PostMapping("/cash-payment")
    public SaleCounterManagementBookChairCashPaymentResponse cashPayment(@RequestBody SaleCounterManagementBookChairCashPaymentRequest paymentRequest) throws IOException {
        return saleCounterManagementService.cashPayment(paymentRequest);
    }

    @PostMapping("/start-online-banking")
    public String startOnlineBanking(@RequestBody SaleCounterManagementBookChairPaymentRequest paymentRequest, HttpServletRequest request){
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = saleCounterManagementService.startOnlineBanking(paymentRequest, baseUrl);
        return vnpayUrl;
    }

    @GetMapping("/vnpay-payment")
    public void GetMapping(HttpServletRequest request, HttpServletResponse response) throws IOException {
        saleCounterManagementService.onlineBankingReturn(request,response);
    }

}
