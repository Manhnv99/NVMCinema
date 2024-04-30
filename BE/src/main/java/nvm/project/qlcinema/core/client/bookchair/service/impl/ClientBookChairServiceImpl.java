package nvm.project.qlcinema.core.client.bookchair.service.impl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.bookchair.model.request.ClientBookChairComboFoodRequest;
import nvm.project.qlcinema.core.client.bookchair.model.request.ClientBookChairPaymentRequest;
import nvm.project.qlcinema.core.client.bookchair.repository.ClientBookChairClientRepository;
import nvm.project.qlcinema.core.client.bookchair.repository.ClientBookChairComboFoodRepository;
import nvm.project.qlcinema.core.client.bookchair.repository.ClientBookChairOrderDetailFoodRepository;
import nvm.project.qlcinema.core.client.bookchair.repository.ClientBookChairOrderDetailTicketChairRepository;
import nvm.project.qlcinema.core.client.bookchair.repository.ClientBookChairOrderRepository;
import nvm.project.qlcinema.core.client.bookchair.repository.ClientBookChairPromotionEventRepository;
import nvm.project.qlcinema.core.client.bookchair.repository.ClientBookChairRepository;
import nvm.project.qlcinema.core.client.bookchair.repository.ClientBookChairTicketChairRepository;
import nvm.project.qlcinema.core.client.bookchair.service.ClientBookChairService;
import nvm.project.qlcinema.core.common.ResponseInternetBanking;
import nvm.project.qlcinema.core.common.ResponseObject;
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
public class ClientBookChairServiceImpl implements ClientBookChairService {

    private final ClientBookChairRepository clientBookChairRepository;

    private final ClientBookChairComboFoodRepository clientBookChairComboFoodRepository;

    private final ClientBookChairPromotionEventRepository clientBookChairPromotionEventRepository;

    private final ClientBookChairTicketChairRepository clientBookChairTicketChairRepository;

    private final ClientBookChairClientRepository clientBookChairClientRepository;

    private final ClientBookChairOrderRepository clientBookChairOrderRepository;

    private final ClientBookChairOrderDetailFoodRepository clientBookChairOrderDetailFoodRepository;

    private final ClientBookChairOrderDetailTicketChairRepository clientBookChairOrderDetailTicketChairRepository;

    private final GenerateUniqueString generateUniqueString;

    //state cho xử lý database
    private static final List<String> listTicketChairIdFinal = new ArrayList<>(); //để cập nhật trạng thái ghế và sử dụng làm trường dữ liệu khóa ngoại cho bảng orderDetail

    private static int totalPriceFinal = 0;

    private static String promotionEventCodeFinal = null; // lấy mã giảm giá nếu sử dụng

    private static final List<ClientBookChairComboFoodRequest> listComboFoodRequestFinal = new ArrayList<>(); // lấy combofoodId và số lượng của mỗi combo đó.

    private static String clientIdFinal = ""; // lấy xem ai là người mua

    @Override
    public ResponseObject getDetailShowTime(String showTimeId) {
        try{
            return new ResponseObject(clientBookChairRepository.getDetailShowTime(showTimeId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được thông tin của xuất chiếu này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListTicketChair(String showTimeId) {
        try{
            return new ResponseObject(clientBookChairRepository.getListTicketChair(showTimeId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách ghế!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListComboFood() {
        try{
            return new ResponseObject(clientBookChairComboFoodRepository.getListComboFood());
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được ComboFood!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getPromotionEvent(String code) {
        List<String> errors = new ArrayList<>();

        if(code.trim().isEmpty() || code.length() > 255){
            errors.add("Mã giảm giá bạn nhập không hợp lệ!");
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }
        //check isExist
        Optional<PromotionEvent> isPromotionEventExist = clientBookChairPromotionEventRepository.getPromotionEventByCode(code);
        if(isPromotionEventExist.isEmpty()){
            errors.add("Mã giảm giá bạn nhập không tồn tại!");
            throw new RestApiException(errors,HttpStatus.NOT_FOUND);
        }
        if(isPromotionEventExist.get().getPromotionEventStatus().equals(PromotionEventStatus.DA_HET_HAN)){
            errors.add("Mã giảm giá bạn nhập đã hết hạn sử dụng!");
        } else if (isPromotionEventExist.get().getPromotionEventStatus().equals(PromotionEventStatus.SAP_DIEN_RA)) {
            errors.add("Mã giảm giá bạn nhập chưa đến thời gian diễn ra!");
        }
        //throw Error
        if(!errors.isEmpty()){
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }
        return new ResponseObject(isPromotionEventExist.get());
    }

    @Override
    public String startOnlineBanking(ClientBookChairPaymentRequest paymentRequest,String urlReturn) {
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

        urlReturn += VNPayConfig.online_vnp_ReturnUrl;
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
        for (Enumeration params = request.getParameterNames(); params.hasMoreElements();) {
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
        if (signValue.equals(vnp_SecureHash)) {
            if (VNPayTransactionStatus.SUCCESS.getStatus().equals(request.getParameter("vnp_TransactionStatus"))) {
//                this.createOrder();
                response.sendRedirect(UrlDomain.URL_FE_DOMAIN + "/thong-tin-tai-khoan?" + request.getQueryString());
            } else {
                response.sendRedirect(UrlDomain.URL_FE_DOMAIN + "/thong-tin-tai-khoan?" + request.getQueryString());
            }
        } else {
            response.sendRedirect(UrlDomain.URL_FE_DOMAIN + "/thong-tin-tai-khoan?" + request.getQueryString());
        }
    }

    private ResponseInternetBanking createOrder(){
        try{
            //xử lý cập nhật trạng thái ghế
            for (String ticketChairId : listTicketChairIdFinal){
                TicketChair ticketChair = clientBookChairTicketChairRepository.getReferenceById(ticketChairId);
                ticketChair.setStatus(true);
                clientBookChairTicketChairRepository.save(ticketChair);
            }
            //tạo Order
            Order postOrder = new Order();
            postOrder.setCode(generateUniqueString.generateOrderCode());
            postOrder.setTotalPrice(new BigDecimal(totalPriceFinal));
            postOrder.setOrderDate(LocalDate.now());
            postOrder.setFormality(FormalityOrder.ONLINE);
            Optional<PromotionEvent> isPromotionExist = clientBookChairPromotionEventRepository.getPromotionEventByCode(promotionEventCodeFinal);
            isPromotionExist.ifPresent(postOrder::setPromotionEventId);
            postOrder.setClientId(clientBookChairClientRepository.getReferenceById(clientIdFinal));
            postOrder.setCreatedAt(new Date());
            postOrder.setOrderStatus(OrderStatus.CHUA_DUYET);
            //save Order
            Order orderSaved = clientBookChairOrderRepository.save(postOrder);

            //post orderDetailTicketChair
            for(String ticketChairId : listTicketChairIdFinal){
                clientBookChairOrderDetailTicketChairRepository.save(new OrderDetailTicketChair(
                        orderSaved,
                        clientBookChairTicketChairRepository.getReferenceById(ticketChairId)
                ));
            }

            //post orderDetailFood
            if(!listComboFoodRequestFinal.isEmpty()){
                for(ClientBookChairComboFoodRequest comboFoodRequest : listComboFoodRequestFinal){
                    clientBookChairOrderDetailFoodRepository.save(new OrderDetailFood(
                            orderSaved,
                            clientBookChairComboFoodRepository.getReferenceById(comboFoodRequest.getComboFoodId()),
                            comboFoodRequest.getQuantity()
                    ));
                }
            }else{
                clientBookChairOrderDetailFoodRepository.save(new OrderDetailFood(
                        orderSaved,
                        null,
                        0
                ));
            }

            return new ResponseInternetBanking("Mua vé xem phim tại rap NVMCinema thành công",VNPayTransactionStatus.SUCCESS.getStatus());
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Đã có 1 vài lỗi xảy ra trong quá trình xử lý");
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }
    }

    private void handleSetPaymentRequestFinal(ClientBookChairPaymentRequest paymentRequest){
        this.handleResetPaymentRequestFinal();
        listTicketChairIdFinal.addAll(paymentRequest.getListTicketChairId());
        totalPriceFinal = paymentRequest.getTotalPrice();
        promotionEventCodeFinal = paymentRequest.getPromotionEventCode();
        listComboFoodRequestFinal.addAll(paymentRequest.getListComboFoodRequest());
        clientIdFinal = paymentRequest.getClientId();
    }

    private void handleResetPaymentRequestFinal(){
        listTicketChairIdFinal.clear();
        listComboFoodRequestFinal.clear();
        totalPriceFinal = 0;
        promotionEventCodeFinal = null;
        clientIdFinal = "";
    }

}
