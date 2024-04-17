package nvm.project.qlcinema.core.admin.promotioneventmanagement.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class AdminPromotionEventManagementPostRequest {

    @NotBlank(message = "Tên sự kiện không được để trống!")
    private String name;

    @NotNull(message = "Thời gian bắt đầu sự kiện chưa được chọn!")
    private LocalDate timeStart;

    @NotNull(message = "Thời gian kết thúc sự kiện chưa được chọn!")
    private LocalDate timeEnd;

    @NotNull(message = "Mã khuyến mãi sự kiện không được để trống!")
    private String promotionCode;

    @NotNull(message = "Giá tiền khuyến mãi sự kiện không được để trống!")
    private BigDecimal promotionPrice;

    @NotBlank(message = "Mô tả khuyến mãi sự kiện không được để trống!")
    private String description;

    private MultipartFile image;

}
