package nvm.project.qlcinema.core.client.authentication.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientAuthenticationLoginRequest {

    @NotBlank(message = "Bạn chưa nhập email!")
    private String email;

    @NotNull(message = "Bạn chưa nhập mật khẩu!")
    private String password;

}
