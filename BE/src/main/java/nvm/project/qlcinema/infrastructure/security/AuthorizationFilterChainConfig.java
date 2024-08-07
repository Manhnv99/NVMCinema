package nvm.project.qlcinema.infrastructure.security;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.infrastructure.constant.Role;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import nvm.project.qlcinema.infrastructure.security.oauth2.CustomOAuth2UserService;
import nvm.project.qlcinema.infrastructure.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import nvm.project.qlcinema.infrastructure.security.oauth2.OAuth2AuthenticationFailureHandler;
import nvm.project.qlcinema.infrastructure.security.oauth2.OAuth2AuthenticationSuccessHandler;
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

    private final CustomOAuth2UserService customOAuth2UserService;

    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity.authorizeHttpRequests(authorization ->
                authorization
                        .requestMatchers("/test" + "/**").permitAll()
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
                        .anyRequest().authenticated()
        );
        httpSecurity.oauth2Login(oauth2 -> {
            oauth2.authorizationEndpoint(authorizationEndpointConfig -> {
                //Cấu hình endpoint để truy cập đến authorization server
                authorizationEndpointConfig.baseUri("/oauth2/authorize")
                        .authorizationRequestRepository(httpCookieOAuth2AuthorizationRequestRepository);
                //Cấu tạo 1 lớp đề xử lý trước khi truy cập đến đường link của authorization server
                //ở đây là hình sẽ tạo 2 giá trị cookie để gửi lên web và ở request sau thì lại trích xuất cookie đó ra để lấy giá trị redirectUrl
            });
            oauth2.redirectionEndpoint(redirectionEndpointConfig -> {
                //Cấu hình endpoint redirectUrl -> Nó sẽ đựọc gọi với endpoint chỉ định này với 1 mã code mà Authorization Server trả về
                redirectionEndpointConfig.baseUri("/oauth2/callback/*");
            });
            oauth2.userInfoEndpoint(userInfoEndpointConfig -> {
                //Sau khi mà được Authorization Server trả về cho các thông tin của người dùng thì sẽ lưu nó trong đối tượng OAuth2UserRequest
                //Và lớp này sẽ xử lý việc tạo user thêm vào repo hay là update.
                userInfoEndpointConfig.userService(customOAuth2UserService);
            });
            oauth2.successHandler(oAuth2AuthenticationSuccessHandler);
            oauth2.failureHandler(oAuth2AuthenticationFailureHandler);
        });
        httpSecurity.authenticationProvider(authenticationProvider);
        httpSecurity.addFilterBefore(jwtAuthenticationConfig, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

}
