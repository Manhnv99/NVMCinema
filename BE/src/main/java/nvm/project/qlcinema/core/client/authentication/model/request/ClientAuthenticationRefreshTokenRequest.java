package nvm.project.qlcinema.core.client.authentication.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientAuthenticationRefreshTokenRequest {

    private String clientId;

    private String refreshToken;

}
