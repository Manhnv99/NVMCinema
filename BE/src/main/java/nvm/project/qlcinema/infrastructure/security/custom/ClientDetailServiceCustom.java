package nvm.project.qlcinema.infrastructure.security.custom;

import org.springframework.security.core.userdetails.UserDetails;

public interface ClientDetailServiceCustom {

    UserDetails loadUserByUsername(String username);

}
