package nvm.project.qlcinema.core.client.authentication.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ClientAuthenticationRefreshTokenResponse {

    private String token;

    private String refreshToken;

}
