package nvm.project.qlcinema.core.admin.roommanagement.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AdminRoomManagementPostRoomRequest {

    @NotBlank(message = "Tên phòng không được để trống!")
    private String name;

    @NotBlank(message = "Chi nhánh phòng chưa được chọn!")
    private String branchId;

    @NotNull(message = "Hàng ghế không được để trống!")
    private int row;

    @NotEmpty(message = "Cột ghế không được để trống!")
    private List<String> columns;

}
