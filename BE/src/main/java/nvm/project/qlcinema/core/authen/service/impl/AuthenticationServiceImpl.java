package nvm.project.qlcinema.core.authen.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.authen.model.request.LoginRequest;
import nvm.project.qlcinema.core.authen.model.request.RegisterRequest;
import nvm.project.qlcinema.core.authen.model.response.AuthenticationResponse;
import nvm.project.qlcinema.core.authen.repository.AuthenticationAreaRepository;
import nvm.project.qlcinema.core.authen.repository.AuthenticationUserRepository;
import nvm.project.qlcinema.core.authen.service.AuthenticationService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.Area;
import nvm.project.qlcinema.entity.User;
import nvm.project.qlcinema.infrastructure.constant.Role;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import nvm.project.qlcinema.infrastructure.security.JwtProvider;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author Manhnv99
 */

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationUserRepository authenticationUserRepository;

    private final AuthenticationAreaRepository authenticationAreaRepository;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    private final JwtProvider jwtProvider;

    @Override
    public AuthenticationResponse login(LoginRequest loginRequest) {
        try{
            //Process Authentication
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword())
            );
            //Response the token to User
            String token = jwtProvider.generateToken(loginRequest.getEmail());
            return new AuthenticationResponse(token,"Đăng nhập vào hệ thống thành công!");
        }catch (AuthenticationException e){
            List<String> errors = new ArrayList<>();
            errors.add("Tài khoản hoặc mật khẩu không đúng!");
            //throw Errors
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject register(RegisterRequest registerRequest) {
        List<String> errors = new ArrayList<>();

        //check Exist
        Optional<User> isEmailExist = authenticationUserRepository.findUserByEmail(registerRequest.getEmail());
        if(isEmailExist.isPresent()){
            errors.add("Email này đã tồn tại!");
        }
        Optional<User> isCccdExist = authenticationUserRepository.findUserByCccd(registerRequest.getCccd());
        if(isCccdExist.isPresent()){
            errors.add("Căn cước công dân này đã tồn tại!");
        }
        Optional<User> isPhoneNumberExist = authenticationUserRepository.findUserByPhoneNumber(registerRequest.getPhoneNumber());
        if(isPhoneNumberExist.isPresent()){
            errors.add("Số điện thoại này đã tồn tại!");
        }
        Optional<Area> isAreaExist = authenticationAreaRepository.findById(registerRequest.getAreaId());
        if(isAreaExist.isEmpty()){
            errors.add("Không tồn tại khu vực này!");
        }
        //throw Errors
        if(!errors.isEmpty()){
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //post User
        User postUser = new User();
        postUser.setCode(registerRequest.getCode());
        postUser.setName(registerRequest.getName());
        postUser.setCccd(registerRequest.getCccd());
        postUser.setGender(registerRequest.isGender());
        postUser.setBirthDay(registerRequest.getBirthDay());
        postUser.setEmail(registerRequest.getEmail());
        postUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        postUser.setPhoneNumber(registerRequest.getPhoneNumber());
        postUser.setAddress(registerRequest.getAddress());
        for (Role role : Role.values()){
            if(registerRequest.getRole().equals(role.name())){
                postUser.setRole(role);
            }
        }
        postUser.setImageId("imageId");
        postUser.setImageUrl("imageUrl");
        postUser.setAreaId(isAreaExist.get());
        authenticationUserRepository.save(postUser);

        return new ResponseObject("Thêm mới nhân viên thành công!");
    }


}
