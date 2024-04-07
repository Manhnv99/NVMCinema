package nvm.project.qlcinema.infrastructure.security;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class AuthorizationFilterChainConfig {

    private final JwtAuthenticationConfig jwtAuthenticationConfig;

    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity.cors(AbstractHttpConfigurer::disable);
        httpSecurity.authorizeHttpRequests(authorization ->
                authorization.requestMatchers(UrlPath.URL_AUTHENTICATION + "/**").permitAll()
                        .anyRequest().authenticated()
        );
        httpSecurity.authenticationProvider(authenticationProvider);
        httpSecurity.addFilterBefore(jwtAuthenticationConfig, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

}
