package nvm.project.qlcinema.core.client.bookchair.model.request;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class ClientBookChairPaymentRequest {

    private List<String> listTicketChairId; //để cập nhật trạng thái ghế và sử dụng làm trường dữ liệu khóa ngoại cho bảng orderDetail

    private int totalPrice;

    private String promotionEventId; // lấy mã giảm giá nếu sử dụng

    private List<ClientBookChairComboFoodRequest> listComboFoodRequest; // lấy combofoodId và số lượng của mỗi combo đó.

    private String clientId; // lấy xem ai là người mua

}
