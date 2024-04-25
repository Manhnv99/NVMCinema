package nvm.project.qlcinema.core.client.informationclient.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
public class ClientInformationClientPutClientRequest {

    private String id;

    @NotBlank(message = "Tên không được để trống!")
    private String name;

    @NotBlank(message = "Email không được để trống!")
    private String email;

    @NotBlank(message = "Số điện thoại không được để trống!")
    private String phone;

    @NotNull(message = "Ngày sinh không được để trống!")
    private LocalDate birthDay;

    @NotBlank(message = "Thành phố không được để trống!")
    private String province;

    @NotBlank(message = "Địa chỉ không được để trống!")
    private String address;

    @NotBlank(message = "Mật khẩu không được để trống!")
    private String password;

    private MultipartFile image;

}
