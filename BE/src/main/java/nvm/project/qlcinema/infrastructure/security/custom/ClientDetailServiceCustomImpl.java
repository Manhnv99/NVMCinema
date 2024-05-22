package nvm.project.qlcinema.infrastructure.security.custom;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.entity.Client;
import nvm.project.qlcinema.infrastructure.security.UserPrincipal;
import nvm.project.qlcinema.infrastructure.security.repository.AuthenticationClientRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClientDetailServiceCustomImpl implements ClientDetailServiceCustom {

    private final AuthenticationClientRepository authenticationClientRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Client> clientOptional = authenticationClientRepository.findByEmail(username);
        if(clientOptional.isPresent()){
            return UserPrincipal.create(clientOptional.get());
        }else{
            throw new UsernameNotFoundException("Không tìm thấy người dùng này!");
        }
    }

}
