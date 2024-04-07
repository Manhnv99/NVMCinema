package nvm.project.qlcinema.core.authen.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "Mã không được để trống!")
    private String code;

    @NotBlank(message = "Tên không được để trống!")
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

    @NotBlank(message = "Vai trò không được để trống!")
    private String role;

    @NotBlank(message = "Khu vực chưa được chọn!")
    private String areaId;

}
