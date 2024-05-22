package nvm.project.qlcinema.infrastructure.security.oauth2;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.entity.Client;
import nvm.project.qlcinema.infrastructure.constant.Role;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import nvm.project.qlcinema.infrastructure.security.UserPrincipal;
import nvm.project.qlcinema.infrastructure.security.oauth2.user.OAuth2UserInfo;
import nvm.project.qlcinema.infrastructure.security.oauth2.user.OAuth2UserInfoFactory;
import nvm.project.qlcinema.infrastructure.security.repository.AuthenticationClientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final AuthenticationClientRepository clientRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(
                oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes()
        );
        if (StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new RestApiException(List.of("Không tìm thấy email!"), HttpStatus.BAD_REQUEST);
        }
        Optional<Client> clientOptional = clientRepository.findByEmail(oAuth2UserInfo.getEmail());
        Client client;
        if (clientOptional.isPresent()) {
            client = clientOptional.get();
            client = updateExistingUser(client, oAuth2UserInfo);
        } else {
            client = registerNewUser(oAuth2UserInfo);
        }

        return UserPrincipal.create(client, oAuth2User.getAttributes());
    }

    private Client registerNewUser(OAuth2UserInfo oAuth2UserInfo) {
        Optional<Client> newestClient = clientRepository.getNewest();
        Client client = new Client();
        client.setEmail(oAuth2UserInfo.getEmail());
        client.setName(oAuth2UserInfo.getName());
        client.setImageUrl(oAuth2UserInfo.getImageUrl());
        client.setCreatedAt(new Date());
        client.setDeleted(true);
        client.setRole(Role.ROLE_CLIENT);
        if (newestClient.isPresent()) {
            String newestCode = newestClient.get().getCode();
            client.setCode(newestCode.substring(0, 2) + (Integer.parseInt(newestCode.substring(2)) + 1));
        } else {
            client.setCode("CL1");
        }
        return clientRepository.save(client);
    }

    private Client updateExistingUser(Client existingClient, OAuth2UserInfo oAuth2UserInfo) {
        existingClient.setName(oAuth2UserInfo.getName());
        existingClient.setImageUrl(oAuth2UserInfo.getImageUrl());
        return clientRepository.save(existingClient);
    }

}
