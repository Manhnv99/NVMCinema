package nvm.project.qlcinema.infrastructure.security.oauth2.user;

import nvm.project.qlcinema.infrastructure.constant.OAuth2Provider;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.http.HttpStatus;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase(OAuth2Provider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else {
            List<String> error = new ArrayList<>();
            error.add("Login with" + registrationId + "không hỗ trợ!");
            throw new RestApiException(error, HttpStatus.BAD_REQUEST);
        }
    }

}
