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
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

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

    @GetMapping("/provinces")
    public ResponseObject getProvinces() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://provinces.open-api.vn/api/?depth=1";

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            return new ResponseObject(response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách tỉnh thành phố!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
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
