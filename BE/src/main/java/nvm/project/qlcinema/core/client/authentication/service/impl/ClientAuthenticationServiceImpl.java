package nvm.project.qlcinema.core.client.authentication.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.authentication.model.request.ClientAuthenticationLoginRequest;
import nvm.project.qlcinema.core.client.authentication.model.request.ClientAuthenticationRefreshTokenRequest;
import nvm.project.qlcinema.core.client.authentication.model.request.ClientAuthenticationRegisterRequest;
import nvm.project.qlcinema.core.client.authentication.model.response.ClientAuthenticationLoginResponse;
import nvm.project.qlcinema.core.client.authentication.model.response.ClientAuthenticationRefreshTokenResponse;
import nvm.project.qlcinema.core.client.authentication.repository.ClientAuthenticationRepository;
import nvm.project.qlcinema.core.client.authentication.service.ClientAuthenticationService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.Client;
import nvm.project.qlcinema.infrastructure.config.cloudinary.CloudinaryConfig;
import nvm.project.qlcinema.infrastructure.constant.Role;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import nvm.project.qlcinema.infrastructure.security.JwtProvider;
import nvm.project.qlcinema.utils.ValidUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClientAuthenticationServiceImpl implements ClientAuthenticationService {

    private final ClientAuthenticationRepository clientAuthenticationRepository;

    private final CloudinaryConfig cloudinaryConfig;

    private final ValidUtils validUtils;

    private final JwtProvider jwtProvider;

    @Override
    public ClientAuthenticationLoginResponse loginAuthentication(
            ClientAuthenticationLoginRequest loginRequest
    ) {
        Optional<Client> loginAuthentication = clientAuthenticationRepository.loginAuthentication(loginRequest.getEmail(), loginRequest.getPassword());
        if (loginAuthentication.isPresent()) {
            return new ClientAuthenticationLoginResponse(
                    "Đăng nhập thành công!",
                    jwtProvider.generateTokenClient(loginAuthentication.get()),
                    jwtProvider.generateRefreshTokenClient()
            );
        } else {
            List<String> errors = new ArrayList<>();
            errors.add("Tài khoản hoặc mật khẩu không chính xác!");
            throw new RestApiException(errors, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ClientAuthenticationRefreshTokenResponse refreshTokenAuthentication(ClientAuthenticationRefreshTokenRequest refreshTokenRequest) {
        return new ClientAuthenticationRefreshTokenResponse(
                jwtProvider.generateTokenClient(clientAuthenticationRepository.getReferenceById(refreshTokenRequest.getClientId())),
                jwtProvider.generateRefreshTokenClient()
        );
    }

    @Override
    public ResponseObject registerAuthentication(ClientAuthenticationRegisterRequest registerRequest) {
        List<String> errors = new ArrayList<>();
        //valid
        if (validUtils.isValidEmail(registerRequest.getEmail())) {
            errors.add("Email không hợp lệ!");
        }
        if (validUtils.isPhoneValid(registerRequest.getPhoneNumber())) {
            errors.add("Số điện thoại không hợp lệ!");
        }
        //throwError
        if (!errors.isEmpty()) {
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
        //check Auth Password
        if (!registerRequest.getPassword().equalsIgnoreCase(registerRequest.getAuthPassword())) {
            errors.add("Mật khẩu xác thực không khớp với mật khẩu!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
        //check Exist
        Optional<Client> isUserExist = clientAuthenticationRepository.findByEmail(registerRequest.getEmail());
        if (isUserExist.isPresent()) {
            errors.add("Đã tồn tại email này!");
            throw new RestApiException(errors, HttpStatus.CONFLICT);
        }

        Client postClient = new Client();
        Optional<Client> clientNewest = clientAuthenticationRepository.getNewest();
        if (clientNewest.isPresent()) {
            String code = clientNewest.get().getCode();
            postClient.setCode(code.substring(0, 2) + ((Integer.parseInt(code.substring(2))) + 1));
        } else {
            postClient.setCode("CL1");
        }
        postClient.setName(registerRequest.getName());
        postClient.setBirthDay(registerRequest.getBirthDay());
        postClient.setEmail(registerRequest.getEmail());
        postClient.setPassword(registerRequest.getPassword());
        postClient.setPhoneNumber(registerRequest.getPhoneNumber());
        postClient.setProvince(registerRequest.getProvince());
        postClient.setAddressDetail(registerRequest.getAddressDetail());
        postClient.setRole(Role.ROLE_CLIENT);
        try {
            var result = cloudinaryConfig.upload(registerRequest.getImage());//upload image to cloudinary
            postClient.setImageId((String) result.get("public_id"));
            postClient.setImageUrl((String) result.get("url"));
        } catch (Exception e) {
            errors.add("Đã xảy ra 1 vài sự cố!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
        postClient.setDeleted(true);
        postClient.setCreatedAt(new Date());
        clientAuthenticationRepository.save(postClient);

        return new ResponseObject("Tạo tài khoản thành công!");
    }

}
