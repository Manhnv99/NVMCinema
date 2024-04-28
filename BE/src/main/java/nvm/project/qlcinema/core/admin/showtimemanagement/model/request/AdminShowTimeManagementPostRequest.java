package nvm.project.qlcinema.core.admin.showtimemanagement.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class AdminShowTimeManagementPostRequest {

    @NotNull(message = "Ngày chiếu không được để trống!")
    private List<LocalDate> screeningDate;

    @NotEmpty(message = "Thời gian chiếu không được để trống")
    private List<String> timeStart;

    @NotNull(message = "Giá vé không được để trống!")
    private BigDecimal ticketPrice;

    @NotBlank(message = "Bạn chưa chọn bộ phim chiếu!")
    private String movieId;

    @NotEmpty(message = "Bạn chưa chọn phòng chiếu!")
    private List<String> roomId;

}
