package nvm.project.qlcinema.infrastructure.security;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import nvm.project.qlcinema.entity.Area;
import nvm.project.qlcinema.entity.Branch;
import nvm.project.qlcinema.entity.Client;
import nvm.project.qlcinema.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPrincipal implements OAuth2User, UserDetails {

    String id;

    String email;

    String password;

    String name;

    String code;

    String imageUrl;

    String province;

    Area area;

    Branch branch;

    private Collection<? extends GrantedAuthority> authorities;

    private Map<String, Object> attributes;

    /**
     * @param user
     * @return convert User to UserPrincipal
     */
    public static UserPrincipal create(User user) {
        List<GrantedAuthority> authorities = Collections.
                singletonList(new SimpleGrantedAuthority(user.getRole().name()));
        return UserPrincipal.builder()
                .code(user.getCode())
                .password(user.getPassword())
                .name(user.getName())
                .id(user.getId())
                .email(user.getEmail())
                .imageUrl(user.getImageUrl())
                .authorities(authorities)
                .area(user.getAreaId())
                .branch(user.getBranchId())
                .build();
    }

    public static UserPrincipal create(Client client) {
        List<GrantedAuthority> authorities = Collections.
                singletonList(new SimpleGrantedAuthority(client.getRole().name()));
        return UserPrincipal.builder()
                .code(client.getCode())
                .password(client.getPassword())
                .name(client.getName())
                .id(client.getId())
                .email(client.getEmail())
                .imageUrl(client.getImageUrl())
                .province(client.getProvince())
                .authorities(authorities)
                .build();
    }

    public static UserPrincipal create(Client client, Map<String, Object> attributes) {
        UserPrincipal userPrincipal = UserPrincipal.create(client);
        userPrincipal.setAttributes(attributes);
        return userPrincipal;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
