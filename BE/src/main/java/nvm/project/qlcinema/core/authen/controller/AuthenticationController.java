package nvm.project.qlcinema.core.authen.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.authen.model.request.LoginRequest;
import nvm.project.qlcinema.core.authen.model.request.PutRegisterRequest;
import nvm.project.qlcinema.core.authen.model.request.RegisterRequest;
import nvm.project.qlcinema.core.authen.model.response.AuthenticationResponse;
import nvm.project.qlcinema.core.authen.service.AuthenticationService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@CrossOrigin("*")
@RequestMapping(UrlPath.URL_API_AUTHENTICATION)
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody LoginRequest loginRequest){
        return authenticationService.login(loginRequest);
    }

    @PostMapping("/register")
    public ResponseObject register(@ModelAttribute @Valid RegisterRequest registerRequest) throws IOException {
        return authenticationService.register(registerRequest);
    }

    @PutMapping("/put-register")
    public ResponseObject putRegister(@ModelAttribute @Valid PutRegisterRequest putRegisterRequest) throws IOException {
        return authenticationService.putRegister(putRegisterRequest);
    }

}
