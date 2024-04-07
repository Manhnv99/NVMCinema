package nvm.project.qlcinema.core.authen.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.authen.model.request.LoginRequest;
import nvm.project.qlcinema.core.authen.model.request.RegisterRequest;
import nvm.project.qlcinema.core.authen.model.response.AuthenticationResponse;
import nvm.project.qlcinema.core.authen.service.AuthenticationService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping(UrlPath.URL_AUTHENTICATION)
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody LoginRequest loginRequest){
        return authenticationService.login(loginRequest);
    }

    @PostMapping("/register")
    public ResponseObject register(@RequestBody @Valid RegisterRequest registerRequest){
        return authenticationService.register(registerRequest);
    }

}
