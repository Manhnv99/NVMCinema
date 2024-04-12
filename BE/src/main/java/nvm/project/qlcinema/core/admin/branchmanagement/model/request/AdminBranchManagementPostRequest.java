package nvm.project.qlcinema.core.admin.branchmanagement.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class AdminBranchManagementPostRequest {

    @NotBlank(message = "Tên chi nhánh không được để trống!")
    private String name;

    @NotBlank(message = "Email chi nhánh không được để trống!")
    private String email;

    @NotBlank(message = "Address chi nhánh không được để trống!")
    private String address;

    @NotBlank(message = "HostLine chi nhánh không được để trống!")
    private String hostLine;

    private MultipartFile image;

    @NotBlank(message = "Bạn chưa chọn khu vực của chi nhánh!")
    private String areaId;

}
