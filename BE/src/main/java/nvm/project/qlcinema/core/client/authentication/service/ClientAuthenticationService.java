package nvm.project.qlcinema.core.client.authentication.service;

import nvm.project.qlcinema.core.client.authentication.model.request.ClientAuthenticationLoginRequest;
import nvm.project.qlcinema.core.client.authentication.model.request.ClientAuthenticationRegisterRequest;
import nvm.project.qlcinema.core.client.authentication.model.response.ClientAuthenticationLoginResponse;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface ClientAuthenticationService {

    ClientAuthenticationLoginResponse loginAuthentication(
            ClientAuthenticationLoginRequest loginRequest
    );

    ResponseObject registerAuthentication(ClientAuthenticationRegisterRequest registerRequest);

}
