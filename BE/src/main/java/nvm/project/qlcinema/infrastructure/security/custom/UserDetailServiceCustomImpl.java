package nvm.project.qlcinema.infrastructure.security.custom;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.infrastructure.security.repository.AuthenticationClientRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailServiceCustomImpl implements UserDetailServiceCustom {

    private final AuthenticationClientRepository authenticationClientRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return authenticationClientRepository.findByEmail(username).orElseThrow(
                () -> new UsernameNotFoundException("Không tìm thấy người dùng này!"));
    }
}
