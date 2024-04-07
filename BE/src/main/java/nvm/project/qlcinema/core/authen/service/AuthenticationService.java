package nvm.project.qlcinema.core.authen.service;

import nvm.project.qlcinema.core.authen.model.request.LoginRequest;
import nvm.project.qlcinema.core.authen.model.request.RegisterRequest;
import nvm.project.qlcinema.core.authen.model.response.AuthenticationResponse;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface AuthenticationService {

    AuthenticationResponse login(LoginRequest loginRequest);

    ResponseObject register(RegisterRequest registerRequest);

}
