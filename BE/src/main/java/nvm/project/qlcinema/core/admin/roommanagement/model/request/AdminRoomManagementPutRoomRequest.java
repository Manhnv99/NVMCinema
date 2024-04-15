package nvm.project.qlcinema.core.admin.roommanagement.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AdminRoomManagementPutRoomRequest extends AdminRoomManagementPostRoomRequest{

    private String id;

    @NotBlank(message = "Tên phòng không được để trống!")
    private String name;

    @NotBlank(message = "Chi nhánh phòng chưa được chọn!")
    private String branchId;

    private int row = 0;

    private List<String> columns;

}
