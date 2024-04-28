package nvm.project.qlcinema.core.adminarea.staffmanagement.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
public class AdminAreaStaffManagementPostRequest {

    @NotBlank(message = "Mã nhân viên không được để trống!")
    private String code;

    @NotBlank(message = "Tên nhân viên không được để trống!")
    private String name;

    @NotBlank(message = "Căn cước công dân không được để trống!")
    private String cccd;

    @NotNull(message = "Giới Tính Không được để trống!")
    private boolean gender;

    @NotNull(message = "Ngày sinh không được để trống!")
    private LocalDate birthDay;

    @NotBlank(message = "Email không được để trống!")
    private String email;

    @NotBlank(message = "Password không được để trống!")
    private String password;

    @NotBlank(message = "Số điện thoại không được để trống!")
    private String phoneNumber;

    @NotBlank(message = "Địa chỉ không được để trống!")
    private String address;

    @NotBlank(message = "Chi nhánh chưa được chọn!")
    private String branchId;

    private MultipartFile image;

}
