package nvm.project.qlcinema.core.client.authentication.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
public class ClientAuthenticationRegisterRequest {

    @NotBlank(message = "Họ và tên không được để trống!")
    private String name;

    @NotBlank(message = "Email không được để trống!")
    private String email;

    @NotBlank(message = "Số điện thoại không được để trống!")
    private String phoneNumber;

    @NotNull(message = "Bạn chưa chọn ngày sinh nhật!")
    private LocalDate birthDay;

    @NotBlank(message = "Mật khẩu không được để trống!")
    private String password;

    @NotBlank(message = "Mật khẩu xác thực không được để trống!")
    private String authPassword;

    @NotBlank(message = "Bạn chưa chọn tỉnh thành phố!")
    private String province;

    @NotBlank(message = "Địa chỉ không được để trống!")
    private String addressDetail;

    private MultipartFile image;

}
