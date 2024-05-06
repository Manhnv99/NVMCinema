package nvm.project.qlcinema.core.staff.salecountermanagement.service.impl;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.bookchair.model.request.ClientBookChairComboFoodRequest;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.request.SaleCounterManagementBookChairCashPaymentRequest;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.request.SaleCounterManagementBookChairPaymentRequest;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.request.SaleCounterManagementBookTicketListShowTimeRequest;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.request.SaleCounterManagementListMovieRequest;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.response.SaleCounterManagementBookChairCashPaymentResponse;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.response.SaleCounterManagementListMovieResponse;
import nvm.project.qlcinema.core.staff.salecountermanagement.repository.SaleCounterManagementBookChairComboFoodRepository;
import nvm.project.qlcinema.core.staff.salecountermanagement.repository.SaleCounterManagementBookChairOrderDetailFoodRepository;
import nvm.project.qlcinema.core.staff.salecountermanagement.repository.SaleCounterManagementBookChairOrderDetailTicketChairRepository;
import nvm.project.qlcinema.core.staff.salecountermanagement.repository.SaleCounterManagementBookChairOrderRepository;
import nvm.project.qlcinema.core.staff.salecountermanagement.repository.SaleCounterManagementBookChairPromotionEventRepository;
import nvm.project.qlcinema.core.staff.salecountermanagement.repository.SaleCounterManagementBookChairRepository;
import nvm.project.qlcinema.core.staff.salecountermanagement.repository.SaleCounterManagementBookChairTicketChairRepository;
import nvm.project.qlcinema.core.staff.salecountermanagement.repository.SaleCounterManagementBookChairUserRepository;
import nvm.project.qlcinema.core.staff.salecountermanagement.repository.SaleCounterManagementBookTicketRepository;
import nvm.project.qlcinema.core.staff.salecountermanagement.repository.SaleCounterManagementCountryRepository;
import nvm.project.qlcinema.core.staff.salecountermanagement.repository.SaleCounterManagementDirectorRepository;
import nvm.project.qlcinema.core.staff.salecountermanagement.repository.SaleCounterManagementFormatRepository;
import nvm.project.qlcinema.core.staff.salecountermanagement.repository.SaleCounterManagementGenreRepository;
import nvm.project.qlcinema.core.staff.salecountermanagement.repository.SaleCounterManagementRepository;
import nvm.project.qlcinema.core.staff.salecountermanagement.service.SaleCounterManagementService;
import nvm.project.qlcinema.entity.Order;
import nvm.project.qlcinema.entity.OrderDetailFood;
import nvm.project.qlcinema.entity.OrderDetailTicketChair;
import nvm.project.qlcinema.entity.PromotionEvent;
import nvm.project.qlcinema.entity.TicketChair;
import nvm.project.qlcinema.infrastructure.config.vnpay.VNPayConfig;
import nvm.project.qlcinema.infrastructure.constant.FormalityOrder;
import nvm.project.qlcinema.infrastructure.constant.OrderStatus;
import nvm.project.qlcinema.infrastructure.constant.PromotionEventStatus;
import nvm.project.qlcinema.infrastructure.constant.UrlDomain;
import nvm.project.qlcinema.infrastructure.constant.VNPayTransactionStatus;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import nvm.project.qlcinema.utils.GenerateUniqueString;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TimeZone;

@Service
@RequiredArgsConstructor
public class SaleCounterManagementServiceImpl implements SaleCounterManagementService {

    //constant
    private static final List<String> listTicketChairIdFinal = new ArrayList<>(); //để cập nhật trạng thái ghế và sử dụng làm trường dữ liệu khóa ngoại cho bảng orderDetail

    private static int totalPriceFinal = 0;

    private static String promotionEventCodeFinal = null; // lấy mã giảm giá nếu sử dụng

    private static String userId = "";

    private static final List<ClientBookChairComboFoodRequest> listComboFoodRequestFinal = new ArrayList<>(); // lấy combofoodId và số lượng của mỗi combo đó.

    //Repository
    private final SaleCounterManagementBookTicketRepository saleCounterManagementBookTicketRepository;

    private final SaleCounterManagementCountryRepository saleCounterManagementCountryRepository;

    private final SaleCounterManagementDirectorRepository saleCounterManagementDirectorRepository;

    private final SaleCounterManagementFormatRepository saleCounterManagementFormatRepository;

    private final SaleCounterManagementGenreRepository saleCounterManagementGenreRepository;

    private final SaleCounterManagementRepository saleCounterManagementRepository;

    private final SaleCounterManagementBookChairRepository saleCounterManagementBookChairRepository;

    private final SaleCounterManagementBookChairComboFoodRepository saleCounterManagementBookChairComboFoodRepository;

    private final SaleCounterManagementBookChairPromotionEventRepository saleCounterManagementBookChairPromotionEventRepository;

    //Pay Online
    private final GenerateUniqueString generateUniqueString;

    private final SaleCounterManagementBookChairTicketChairRepository saleCounterManagementBookChairTicketChairRepository;

    private final SaleCounterManagementBookChairUserRepository saleCounterManagementBookChairUserRepository;

    private final SaleCounterManagementBookChairOrderRepository saleCounterManagementBookChairOrderRepository;

    private final SaleCounterManagementBookChairOrderDetailFoodRepository saleCounterManagementBookChairOrderDetailFoodRepository;

    private final SaleCounterManagementBookChairOrderDetailTicketChairRepository saleCounterManagementBookChairOrderDetailTicketChairRepository;

    @Override
    public PageableObject<SaleCounterManagementListMovieResponse> getSearchListMovie(SaleCounterManagementListMovieRequest request) {
        try {
            PageRequest pageRequest = PageRequest.of(request.getPage() - 1, request.getSize());
            return new PageableObject<>(saleCounterManagementRepository.getSearchListMovie(pageRequest, request));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách phim!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListCountry() {
        try {
            return new ResponseObject(saleCounterManagementCountryRepository.getListCountry());
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách quốc gia!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListDirector() {
        try {
            return new ResponseObject(saleCounterManagementDirectorRepository.getListDirector());
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách đạo diễn!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListFormat() {
        try {
            return new ResponseObject(saleCounterManagementFormatRepository.getListFormat());
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách phân giải!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListGenre() {
        try {
            return new ResponseObject(saleCounterManagementGenreRepository.getListGenre());
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách thể loại!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListShowTime(SaleCounterManagementBookTicketListShowTimeRequest request) {
        try {
            return new ResponseObject(saleCounterManagementBookTicketRepository.getListShowTime(request));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách lịch chiếu!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getDetailShowTime(String showTimeId) {
        try {
            return new ResponseObject(saleCounterManagementBookChairRepository.getDetailShowTime(showTimeId));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được thông tin của xuất chiếu này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListTicketChair(String showTimeId) {
        try {
            return new ResponseObject(saleCounterManagementBookChairRepository.getListTicketChair(showTimeId));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách ghế!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListComboFood() {
        try {
            return new ResponseObject(saleCounterManagementBookChairComboFoodRepository.getListComboFood());
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được ComboFood!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getPromotionEvent(String code) {
        List<String> errors = new ArrayList<>();

        if (code.trim().isEmpty() || code.length() > 255) {
            errors.add("Mã giảm giá bạn nhập không hợp lệ!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
        //check isExist
        Optional<PromotionEvent> isPromotionEventExist = saleCounterManagementBookChairPromotionEventRepository.getPromotionEventByCode(code);
        if (isPromotionEventExist.isEmpty()) {
            errors.add("Mã giảm giá bạn nhập không tồn tại!");
            throw new RestApiException(errors, HttpStatus.NOT_FOUND);
        }
        if (isPromotionEventExist.get().getPromotionEventStatus().equals(PromotionEventStatus.DA_HET_HAN)) {
            errors.add("Mã giảm giá bạn nhập đã hết hạn sử dụng!");
        } else if (isPromotionEventExist.get().getPromotionEventStatus().equals(PromotionEventStatus.SAP_DIEN_RA)) {
            errors.add("Mã giảm giá bạn nhập chưa đến thời gian diễn ra!");
        }
        //throw Error
        if (!errors.isEmpty()) {
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
        return new ResponseObject(isPromotionEventExist.get());
    }

    @Override
    public SaleCounterManagementBookChairCashPaymentResponse cashPayment(SaleCounterManagementBookChairCashPaymentRequest paymentRequest) throws IOException {
        try {
            //xử lý cập nhật trạng thái ghế
            for (String ticketChairId : paymentRequest.getListTicketChairId()) {
                TicketChair ticketChair = saleCounterManagementBookChairTicketChairRepository.getReferenceById(ticketChairId);
                ticketChair.setStatus(true);
                saleCounterManagementBookChairTicketChairRepository.save(ticketChair);
            }
            //tạo Order
            Order postOrder = new Order();
            postOrder.setCode(generateUniqueString.generateOrderCode());
            postOrder.setTotalPrice(new BigDecimal(paymentRequest.getTotalPrice()));
            postOrder.setOrderDate(LocalDate.now());
            postOrder.setFormality(FormalityOrder.OFFLINE);
            Optional<PromotionEvent> isPromotionExist = saleCounterManagementBookChairPromotionEventRepository.getPromotionEventByCode(paymentRequest.getPromotionEventCode());
            isPromotionExist.ifPresent(postOrder::setPromotionEventId);
            postOrder.setCreatedAt(new Date());
            postOrder.setOrderStatus(OrderStatus.DA_DUYET);
            postOrder.setUserId(saleCounterManagementBookChairUserRepository.getReferenceById(paymentRequest.getUserId()));
            //save Order
            Order orderSaved = saleCounterManagementBookChairOrderRepository.save(postOrder);

            //post orderDetailTicketChair
            for (String ticketChairId : paymentRequest.getListTicketChairId()) {
                saleCounterManagementBookChairOrderDetailTicketChairRepository.save(new OrderDetailTicketChair(
                        orderSaved,
                        saleCounterManagementBookChairTicketChairRepository.getReferenceById(ticketChairId)
                ));
            }

            //post orderDetailFood
            if (!paymentRequest.getListComboFoodRequest().isEmpty()) {
                for (ClientBookChairComboFoodRequest comboFoodRequest : paymentRequest.getListComboFoodRequest()) {
                    saleCounterManagementBookChairOrderDetailFoodRepository.save(new OrderDetailFood(
                            orderSaved,
                            saleCounterManagementBookChairComboFoodRepository.getReferenceById(comboFoodRequest.getComboFoodId()),
                            comboFoodRequest.getQuantity()
                    ));
                }
            } else {
                saleCounterManagementBookChairOrderDetailFoodRepository.save(new OrderDetailFood(
                        orderSaved,
                        null,
                        0
                ));
            }
            String codeStatus = VNPayTransactionStatus.SUCCESS.getStatus(); //lấy ra code status
            String totalPrice = (orderSaved.getTotalPrice().multiply(new BigDecimal(100))) + ""; //nhân với 100 -> ra đúng định dạng tiền
            String orderCode = orderSaved.getCode();
            return new SaleCounterManagementBookChairCashPaymentResponse(
                    UrlDomain.URL_FE_DOMAIN + "/staff/management-sale-counter?" +
                            "codeStatus=" + codeStatus + "&totalPrice=" + totalPrice + "&orderCode=" + orderCode
            );
        } catch (Exception e) {
            String codeStatus = VNPayTransactionStatus.FAILED.getStatus(); //lấy ra code status
            return new SaleCounterManagementBookChairCashPaymentResponse(
                    UrlDomain.URL_FE_DOMAIN + "/staff/management-sale-counter?" +
                            "codeStatus=" + codeStatus
            );
        }
    }

    @Override
    public String startOnlineBanking(SaleCounterManagementBookChairPaymentRequest paymentRequest, String urlReturn) {
        this.handleSetPaymentRequestFinal(paymentRequest); // set payment request
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";
        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;
        String orderType = "order-type";

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(paymentRequest.getTotalPrice() * 100));
        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toán hóa đơn mua vé xem phim NVMCinema");
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = "vn";
        vnp_Params.put("vnp_Locale", locate);

        urlReturn += VNPayConfig.offline_vnp_ReturnUrl;
        vnp_Params.put("vnp_ReturnUrl", urlReturn);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                try {
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    //Build query
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;
        return paymentUrl;
    }

    @Override
    public void onlineBankingReturn(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Map fields = new HashMap();
        for (Enumeration params = request.getParameterNames(); params.hasMoreElements(); ) {
            String fieldName = null;
            String fieldValue = null;
            try {
                fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII.toString());
                fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                fields.put(fieldName, fieldValue);
            }
        }

        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        if (fields.containsKey("vnp_SecureHashType")) {
            fields.remove("vnp_SecureHashType");
        }
        if (fields.containsKey("vnp_SecureHash")) {
            fields.remove("vnp_SecureHash");
        }
        String signValue = VNPayConfig.hashAllFields(fields);
        //custom resposne URL
        String codeStatus = request.getParameter("vnp_ResponseCode"); //lấy ra code status
        String totalPrice = request.getParameter("vnp_Amount");
        if (signValue.equals(vnp_SecureHash)) {
            if (VNPayTransactionStatus.SUCCESS.getStatus().equals(request.getParameter("vnp_TransactionStatus"))) {
                String orderCode = this.createOrder();
                response.sendRedirect(
                        UrlDomain.URL_FE_DOMAIN + "/staff/management-sale-counter?" +
                                "codeStatus=" + codeStatus + "&totalPrice=" + totalPrice + "&orderCode=" + orderCode
                );
            } else {
                response.sendRedirect(
                        UrlDomain.URL_FE_DOMAIN + "/staff/management-sale-counter?" +
                                "codeStatus=" + codeStatus
                );
            }
        } else {
            response.sendRedirect(
                    UrlDomain.URL_FE_DOMAIN + "/staff/management-sale-counter?" +
                            "codeStatus=" + codeStatus
            );
        }
    }

    @Override
    public ResponseObject getDetailOrder(String orderCode) {
        try {
            return new ResponseObject(saleCounterManagementBookChairOrderRepository.getDetailOrder(orderCode));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được hóa đơn này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    private String createOrder() {
        try {
            //xử lý cập nhật trạng thái ghế
            for (String ticketChairId : listTicketChairIdFinal) {
                TicketChair ticketChair = saleCounterManagementBookChairTicketChairRepository.getReferenceById(ticketChairId);
                ticketChair.setStatus(true);
                saleCounterManagementBookChairTicketChairRepository.save(ticketChair);
            }
            //tạo Order
            Order postOrder = new Order();
            postOrder.setCode(generateUniqueString.generateOrderCode());
            postOrder.setTotalPrice(new BigDecimal(totalPriceFinal));
            postOrder.setOrderDate(LocalDate.now());
            postOrder.setFormality(FormalityOrder.OFFLINE);
            Optional<PromotionEvent> isPromotionExist = saleCounterManagementBookChairPromotionEventRepository.getPromotionEventByCode(promotionEventCodeFinal);
            isPromotionExist.ifPresent(postOrder::setPromotionEventId);
            postOrder.setCreatedAt(new Date());
            postOrder.setOrderStatus(OrderStatus.DA_DUYET);
            postOrder.setUserId(saleCounterManagementBookChairUserRepository.getReferenceById(userId));
            //save Order
            Order orderSaved = saleCounterManagementBookChairOrderRepository.save(postOrder);

            //post orderDetailTicketChair
            for (String ticketChairId : listTicketChairIdFinal) {
                saleCounterManagementBookChairOrderDetailTicketChairRepository.save(new OrderDetailTicketChair(
                        orderSaved,
                        saleCounterManagementBookChairTicketChairRepository.getReferenceById(ticketChairId)
                ));
            }

            //post orderDetailFood
            if (!listComboFoodRequestFinal.isEmpty()) {
                for (ClientBookChairComboFoodRequest comboFoodRequest : listComboFoodRequestFinal) {
                    saleCounterManagementBookChairOrderDetailFoodRepository.save(new OrderDetailFood(
                            orderSaved,
                            saleCounterManagementBookChairComboFoodRepository.getReferenceById(comboFoodRequest.getComboFoodId()),
                            comboFoodRequest.getQuantity()
                    ));
                }
            } else {
                saleCounterManagementBookChairOrderDetailFoodRepository.save(new OrderDetailFood(
                        orderSaved,
                        null,
                        0
                ));
            }
            return orderSaved.getCode();
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Đã có 1 vài lỗi xảy ra trong quá trình xử lý");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    private void handleSetPaymentRequestFinal(SaleCounterManagementBookChairPaymentRequest paymentRequest) {
        this.handleResetPaymentRequestFinal();
        listTicketChairIdFinal.addAll(paymentRequest.getListTicketChairId());
        totalPriceFinal = paymentRequest.getTotalPrice();
        promotionEventCodeFinal = paymentRequest.getPromotionEventCode();
        listComboFoodRequestFinal.addAll(paymentRequest.getListComboFoodRequest());
        userId = paymentRequest.getUserId();
    }

    private void handleResetPaymentRequestFinal() {
        listTicketChairIdFinal.clear();
        listComboFoodRequestFinal.clear();
        totalPriceFinal = 0;
        promotionEventCodeFinal = null;
        userId = "";
    }


    //cron Scheduled
    @PostConstruct
    public void updateOrderExpire() {
        saleCounterManagementRepository.updateOrderStatusWhenShowTimeExpire();
    }

}
