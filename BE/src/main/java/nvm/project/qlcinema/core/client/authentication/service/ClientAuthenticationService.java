package nvm.project.qlcinema.core.client.authentication.service;

import nvm.project.qlcinema.core.client.authentication.model.request.ClientAuthenticationLoginRequest;
import nvm.project.qlcinema.core.client.authentication.model.request.ClientAuthenticationRefreshTokenRequest;
import nvm.project.qlcinema.core.client.authentication.model.request.ClientAuthenticationRegisterRequest;
import nvm.project.qlcinema.core.client.authentication.model.response.ClientAuthenticationLoginResponse;
import nvm.project.qlcinema.core.client.authentication.model.response.ClientAuthenticationRefreshTokenResponse;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface ClientAuthenticationService {

    ClientAuthenticationLoginResponse loginAuthentication(
            ClientAuthenticationLoginRequest loginRequest
    );

    ClientAuthenticationRefreshTokenResponse refreshTokenAuthentication(
            ClientAuthenticationRefreshTokenRequest refreshTokenRequest
    );

    ResponseObject registerAuthentication(ClientAuthenticationRegisterRequest registerRequest);

}
