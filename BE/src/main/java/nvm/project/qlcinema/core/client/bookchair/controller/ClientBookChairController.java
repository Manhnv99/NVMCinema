package nvm.project.qlcinema.core.client.bookchair.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.bookchair.model.request.ClientBookChairPaymentRequest;
import nvm.project.qlcinema.core.client.bookchair.service.ClientBookChairService;
import nvm.project.qlcinema.core.common.ResponseInternetBanking;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.ui.Model;
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
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlPath.URL_API_CLIENT_BOOK_CHAIR)
public class ClientBookChairController {

    private final ClientBookChairService clientBookChairService;

    @GetMapping("/detail-showtime/{showTimeId}")
    public ResponseObject getDetailShowTime(@PathVariable String showTimeId) {
        return clientBookChairService.getDetailShowTime(showTimeId);
    }

    @GetMapping("/list-ticket-chair/{showTimeId}")
    public ResponseObject getListTicketChair(@PathVariable String showTimeId) {
        return clientBookChairService.getListTicketChair(showTimeId);
    }

    @GetMapping("/list-combo-food")
    public ResponseObject getListComboFood() {
        return clientBookChairService.getListComboFood();
    }

    @GetMapping("/get-pme-price")
    public ResponseObject getPromotionEvent(@RequestParam(name = "code", required = false) String code) {
        return clientBookChairService.getPromotionEvent(code);
    }

    @PostMapping("/start-online-banking")
    public String startOnlineBanking(@RequestBody ClientBookChairPaymentRequest paymentRequest, HttpServletRequest request) {
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = clientBookChairService.startOnlineBanking(paymentRequest, baseUrl);
        return vnpayUrl;
    }

    @GetMapping("/vnpay-payment")
    public void GetMapping(HttpServletRequest request, HttpServletResponse response) throws IOException {
        this.clientBookChairService.onlineBankingReturn(request, response);
    }

}
