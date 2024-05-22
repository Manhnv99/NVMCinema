package nvm.project.qlcinema.core.client.authentication.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.authentication.model.request.ClientAuthenticationLoginRequest;
import nvm.project.qlcinema.core.client.authentication.model.request.ClientAuthenticationRefreshTokenRequest;
import nvm.project.qlcinema.core.client.authentication.model.request.ClientAuthenticationRegisterRequest;
import nvm.project.qlcinema.core.client.authentication.model.response.ClientAuthenticationLoginResponse;
import nvm.project.qlcinema.core.client.authentication.model.response.ClientAuthenticationRefreshTokenResponse;
import nvm.project.qlcinema.core.client.authentication.service.ClientAuthenticationService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlPath.URL_API_CLIENT_AUTHENTICATION)
public class ClientAuthenticationController {

    private final ClientAuthenticationService clientAuthenticationService;

    @PostMapping("/login")
    public ClientAuthenticationLoginResponse loginAuthentication(
            @RequestBody @Valid ClientAuthenticationLoginRequest loginRequest
    ) {
        return clientAuthenticationService.loginAuthentication(loginRequest);
    }

    @PostMapping("/register")
    public ResponseObject registerAuthentication(
            @ModelAttribute @Valid ClientAuthenticationRegisterRequest registerRequest
    ) {
        return clientAuthenticationService.registerAuthentication(registerRequest);
    }

    @PostMapping("/refresh-token")
    public ClientAuthenticationRefreshTokenResponse refreshTokenAuthentication(
            @RequestBody ClientAuthenticationRefreshTokenRequest refreshTokenRequest
    ){
        return clientAuthenticationService.refreshTokenAuthentication(refreshTokenRequest);
    }

}
