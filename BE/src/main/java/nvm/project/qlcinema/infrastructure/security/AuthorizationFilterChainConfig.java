package nvm.project.qlcinema.infrastructure.security;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.infrastructure.constant.Role;
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
        httpSecurity.authorizeHttpRequests(authorization ->
                authorization
                        .requestMatchers(UrlPath.URL_API_AUTHENTICATION + "/**").permitAll()
                        //Client
                        .requestMatchers(UrlPath.URL_API_CLIENT_HOME_PAGE + "/list-area").permitAll() // khi vào trang đăng nhập thì nó bắt chọn area thì lúc fetch area thì không cần Author
                        .requestMatchers(UrlPath.URL_API_CLIENT_AUTHENTICATION + "/*").permitAll() // khi đăng nhập thì không cần Author
                        .requestMatchers(UrlPath.URL_API_CLIENT_BOOK_CHAIR + "/vnpay-payment").permitAll() // khi chuyển khoản thì không cần Author
                        .requestMatchers(UrlPath.URL_API_CLIENT_AUTHENTICATION + "/refreshToken").permitAll() // Refresh Token không cần Author
                        .requestMatchers(UrlPath.URL_API_CLIENT + "/**").hasAnyAuthority(Role.ROLE_CLIENT.name())
                        //Client
                        .requestMatchers(UrlPath.URL_API_ADMIN + "/**").hasAnyAuthority(Role.ROLE_ADMIN.name())
                        .requestMatchers(UrlPath.URL_API_ADMIN_AREA + "/**").hasAnyAuthority(Role.ROLE_ADMIN_AREA.name())
                        //Staff
                        .requestMatchers(UrlPath.URL_API_STAFF_SALE_COUNTER_MANAGEMENT + "/vnpay-payment").permitAll()
                        .requestMatchers(UrlPath.URL_API_STAFF + "/**").hasAnyAuthority(Role.ROLE_STAFF.name())
                        //Staff
                        .anyRequest().authenticated()
        );
        httpSecurity.authenticationProvider(authenticationProvider);
        httpSecurity.addFilterBefore(jwtAuthenticationConfig, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

}
