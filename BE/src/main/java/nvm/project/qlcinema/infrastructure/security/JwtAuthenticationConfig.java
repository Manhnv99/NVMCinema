package nvm.project.qlcinema.infrastructure.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.infrastructure.constant.AuthenticationMessage;
import nvm.project.qlcinema.infrastructure.constant.TypeUser;
import nvm.project.qlcinema.infrastructure.security.custom.ClientDetailServiceCustom;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.nio.file.AccessDeniedException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationConfig extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    private final UserDetailsService userDetailsService;

    private final ClientDetailServiceCustom clientDetailServiceCustom;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) {
        try {
            String token = extractToken(request.getHeader("Authorization"));
            if (token != null) {
                String typeUser = jwtProvider.extractTypeUser(token);
                //validate Token nguyên vẹn,hết hạn
                AuthenticationMessage tokenValid = jwtProvider.isTokenValid(token);
                //validate Refresh Token
                AuthenticationMessage refreshTokenValid = jwtProvider.isTokenCloseToExpiration(token);
                if (tokenValid.equals(AuthenticationMessage.TOKEN_INVALID)) {
                    throw new RuntimeException("");
                } else if (tokenValid.equals(AuthenticationMessage.TOKEN_EXPIRATION)) {
                    throw new RuntimeException("");
                } else if (refreshTokenValid.equals(AuthenticationMessage.TOKEN_NEED_TO_REFRESH)) {
                    throw new Exception("");
                } else if (refreshTokenValid.equals(AuthenticationMessage.REFRESH_TOKEN_EXPIRATION)) {
                    throw new RuntimeException("");
                } else if (tokenValid.equals(AuthenticationMessage.TOKEN_VALID)) {
                    //Get UserName from the token
                    String username = jwtProvider.extractUserName(token);
                    //Get UserDetail
                    UserDetails userDetails = null;
                    if (typeUser.equalsIgnoreCase(TypeUser.USER.getType())) {
                        userDetails = userDetailsService.loadUserByUsername(username);
                    } else {
                        userDetails = clientDetailServiceCustom.loadUserByUsername(username);
                    }
                    //Create UserNamePassword Object to push it into SecurityContextHolder to Author the restAPI
                    assert userDetails != null;
                    UsernamePasswordAuthenticationToken userAuth = new UsernamePasswordAuthenticationToken(
                            userDetails.getUsername(),
                            "",
                            userDetails.getAuthorities()
                    );
                    //Create SecurityContextHolder for Authorization
                    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                    userAuth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    securityContext.setAuthentication(userAuth);
                    SecurityContextHolder.setContext(securityContext);
                }
            }
            filterChain.doFilter(request, response);
        } catch (AccessDeniedException | RuntimeException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        } catch (Exception e) {
            response.setStatus(999); //status for refreshToken
        }
    }

    private String extractToken(String token) {
        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            return token.substring(7);
        }
        return null;
    }

}
