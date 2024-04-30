package nvm.project.qlcinema.core.staff.salecountermanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nvm.project.qlcinema.core.client.bookchair.model.request.ClientBookChairComboFoodRequest;

import java.util.List;

@Getter
@Setter
@ToString
public class SaleCounterManagementBookChairPaymentRequest {

    private List<String> listTicketChairId; //để cập nhật trạng thái ghế và sử dụng làm trường dữ liệu khóa ngoại cho bảng orderDetail

    private int totalPrice;

    private String promotionEventCode; // lấy mã giảm giá nếu sử dụng

    private List<ClientBookChairComboFoodRequest> listComboFoodRequest; // lấy combofoodId và số lượng của mỗi combo đó.

    private String userId;

}
