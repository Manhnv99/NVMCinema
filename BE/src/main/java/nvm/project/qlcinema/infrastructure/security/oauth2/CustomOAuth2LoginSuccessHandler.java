package nvm.project.qlcinema.infrastructure.security.oauth2;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.entity.Client;
import nvm.project.qlcinema.infrastructure.constant.Role;
import nvm.project.qlcinema.infrastructure.security.JwtProvider;
import nvm.project.qlcinema.infrastructure.security.repository.AuthenticationClientRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CustomOAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

//    private final AuthenticationClientRepository authenticationClientRepository;
//
//    private final JwtProvider jwtProvider;

    @Value("${domain.fe}")
    private String domainFe;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String picture = oAuth2User.getAttribute("picture");
        String name = oAuth2User.getAttribute("name");
        getRedirectStrategy().sendRedirect(request,response,domainFe + "?token=" + "ahaha");
//        {sub=105278791132593685781, name=Nguyễn Vĩ Mạnh, given_name=Nguyễn Vĩ, family_name=Mạnh,
//        picture=https://lh3.googleusercontent.com/a/ACg8ocK7CE8xihrLtRay80FJxg7dDbEbLOwLdJ4IWB4aLp4p0ejj91d3=s96-c,
//        email=nguyenvimanhnqt@gmail.com, email_verified=true, locale=vi}
//        Optional<Client> isClientExist = authenticationClientRepository.findByEmail(email);
//        if(isClientExist.isPresent()){
//            String token = jwtProvider.generateTokenClient(isClientExist.get());
//            getRedirectStrategy().sendRedirect(request,response,domainFe + "?token=" + token);
//        }else{
//            Optional<Client> clientNewest = authenticationClientRepository.getNewest();
//            Client postClient = new Client();
//            if (clientNewest.isPresent()) {
//                String code = clientNewest.get().getCode();
//                postClient.setCode(code.substring(0, 2) + ((Integer.parseInt(code.substring(2))) + 1));
//            } else {
//                postClient.setCode("CL1");
//            }
//            postClient.setEmail(email);
//            postClient.setName(name);
//            postClient.setDeleted(true);
//            postClient.setCreatedAt(new Date());
//            postClient.setImageUrl(picture);
//            postClient.setRole(Role.ROLE_CLIENT);
//
//            Client clientSaved = authenticationClientRepository.save(postClient);
//            String token = jwtProvider.generateTokenClient(clientSaved);
//            getRedirectStrategy().sendRedirect(request,response, domainFe + "?token=" + token);
//        }
    }

}
