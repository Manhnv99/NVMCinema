package nvm.project.qlcinema.infrastructure.security.oauth2;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.infrastructure.security.JwtProvider;
import nvm.project.qlcinema.infrastructure.security.repository.AuthenticationClientRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

@Configuration
@RequiredArgsConstructor
public class OAuth2AuthenticationConfig {

//    private final AuthenticationClientRepository authenticationClientRepository;
//
//    private final JwtProvider jwtProvider;

    @Bean
    public SimpleUrlAuthenticationSuccessHandler oAuth2LoginSuccessHandler() {
        return new CustomOAuth2LoginSuccessHandler();
    }

}
