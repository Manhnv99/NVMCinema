package nvm.project.qlcinema.core.client.authentication.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ClientAuthenticationLoginResponse {

    private String message;

    private String token;

}
