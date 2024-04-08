package nvm.project.qlcinema.core.authen.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.authen.model.request.LoginRequest;
import nvm.project.qlcinema.core.authen.model.request.PutRegisterRequest;
import nvm.project.qlcinema.core.authen.model.request.RegisterRequest;
import nvm.project.qlcinema.core.authen.model.response.AuthenticationResponse;
import nvm.project.qlcinema.core.authen.repository.AuthenticationAreaRepository;
import nvm.project.qlcinema.core.authen.repository.AuthenticationUserRepository;
import nvm.project.qlcinema.core.authen.service.AuthenticationService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.Area;
import nvm.project.qlcinema.entity.User;
import nvm.project.qlcinema.infrastructure.config.cloudinary.CloudinaryConfig;
import nvm.project.qlcinema.infrastructure.constant.Role;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import nvm.project.qlcinema.infrastructure.security.JwtProvider;
import nvm.project.qlcinema.utils.ValidUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
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

    private final CloudinaryConfig cloudinaryConfig;

    private final JwtProvider jwtProvider;

    private final ValidUtils validUtils;

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
    public ResponseObject register(RegisterRequest registerRequest) throws IOException {
        List<String> errors = new ArrayList<>();

        //check Image Empty
        if(registerRequest.getImage().isEmpty()){
            errors.add("Bạn chưa chọn ảnh đại diện!");
        }
        //throw Errors
        if(!errors.isEmpty()){
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //check Valid
        if(validUtils.isCccdValid(registerRequest.getCccd())){
            errors.add("Căn cước công dân không hợp lệ");
        }
        if(validUtils.isPhoneValid(registerRequest.getPhoneNumber())){
            errors.add("Số điện thoại không hợp lệ!");
        }
        //throw Errors
        if(!errors.isEmpty()){
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

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
        postUser.setCreatedAt(new Date());
        for (Role role : Role.values()){
            if(registerRequest.getRole().equals(role.name())){
                postUser.setRole(role);
            }
        }
        var result=cloudinaryConfig.upload(registerRequest.getImage());//upload image to cloudinary
        postUser.setImageId((String) result.get("public_id"));
        postUser.setImageUrl((String) result.get("url"));
        postUser.setStatus(true);
        postUser.setAreaId(isAreaExist.get());
        authenticationUserRepository.save(postUser);

        return new ResponseObject("Thêm mới nhân viên thành công!");
    }

    @Override
    public ResponseObject putRegister(PutRegisterRequest putRegisterRequest) throws IOException {
        List<String> errors = new ArrayList<>();

        //check Valid
        if(validUtils.isCccdValid(putRegisterRequest.getCccd())){
            errors.add("Căn cước công dân không hợp lệ");
        }
        if(validUtils.isPhoneValid(putRegisterRequest.getPhoneNumber())){
            errors.add("Số điện thoại không hợp lệ!");
        }
        //throw Errors
        if(!errors.isEmpty()){
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //check Exist -> if the user change those fields make it different to their old -> will check duplicate
        Optional<User> putUserOptional = authenticationUserRepository.findById(putRegisterRequest.getId());
        if(putUserOptional.isEmpty()){
            errors.add("Không tìm thấy nhân viên này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }else{
            if(!putUserOptional.get().getEmail().equalsIgnoreCase(putRegisterRequest.getEmail()) ||
                    !putUserOptional.get().getCccd().equalsIgnoreCase(putRegisterRequest.getCccd()) ||
                    !putUserOptional.get().getPhoneNumber().equalsIgnoreCase(putRegisterRequest.getPhoneNumber()) ||
                    !putUserOptional.get().getEmail().equalsIgnoreCase(putRegisterRequest.getEmail())
            ){
                Optional<User> isEmailExist = authenticationUserRepository.findUserByEmail(putRegisterRequest.getEmail());
                if(isEmailExist.isPresent()){
                    errors.add("Email này đã tồn tại!");
                }
                Optional<User> isCccdExist = authenticationUserRepository.findUserByCccd(putRegisterRequest.getCccd());
                if(isCccdExist.isPresent()){
                    errors.add("Căn cước công dân này đã tồn tại!");
                }
                Optional<User> isPhoneNumberExist = authenticationUserRepository.findUserByPhoneNumber(putRegisterRequest.getPhoneNumber());
                if(isPhoneNumberExist.isPresent()){
                    errors.add("Số điện thoại này đã tồn tại!");
                }
                //throw Errors
                if(!errors.isEmpty()){
                    throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
                }
            }
        }

        //check is Area Exist
        Optional<Area> isAreaExist = authenticationAreaRepository.findById(putRegisterRequest.getAreaId());
        if(isAreaExist.isEmpty()){
            errors.add("Không tồn tại khu vực này!");
        }
        //throw Errors
        if(!errors.isEmpty()){
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //post User
        User putUser = putUserOptional.get();
        putUser.setCode(putRegisterRequest.getCode());
        putUser.setName(putRegisterRequest.getName());
        putUser.setCccd(putRegisterRequest.getCccd());
        putUser.setGender(putRegisterRequest.isGender());
        putUser.setBirthDay(putRegisterRequest.getBirthDay());
        putUser.setEmail(putRegisterRequest.getEmail());
        putUser.setPhoneNumber(putRegisterRequest.getPhoneNumber());
        putUser.setAddress(putRegisterRequest.getAddress());
        for (Role role : Role.values()){
            if(putRegisterRequest.getRole().equals(role.name())){
                putUser.setRole(role);
            }
        }
        //if User change their image -> do this
        if(!putRegisterRequest.getImage().isEmpty()){
            var result=cloudinaryConfig.upload(putRegisterRequest.getImage());//upload image to cloudinary
            putUser.setImageId((String) result.get("public_id"));
            putUser.setImageUrl((String) result.get("url"));
        }
        putUser.setAreaId(isAreaExist.get());
        authenticationUserRepository.save(putUser);

        return new ResponseObject("Cập nhật nhân viên thành công!");
    }


}
