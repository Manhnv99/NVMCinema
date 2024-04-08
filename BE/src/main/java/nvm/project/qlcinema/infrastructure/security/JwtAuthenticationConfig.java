package nvm.project.qlcinema.infrastructure.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.infrastructure.constant.AuthenticationMessage;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.file.AccessDeniedException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationConfig extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = extractToken(request.getHeader("Authorization"));
            if(token != null){
                //validate Token nguyên vẹn,hết hạn
                String tokenValid = jwtProvider.isTokenValid(token);

                if(tokenValid.equals(AuthenticationMessage.TOKEN_INVALID.getMessage())){
                    throw new RuntimeException("");
                }else if(tokenValid.equals(AuthenticationMessage.TOKEN_EXPIRATION.getMessage())){
                    throw new RuntimeException("");
                }else if(tokenValid.equals(AuthenticationMessage.TOKEN_VALID.getMessage())){
                    //Get UserName from the token
                    String username = jwtProvider.extractUserName(token);
                    //Get UserDetail
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    //Create UserNamePassword Object to push it into SecurityContextHolder to Author the restAPI
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
            filterChain.doFilter(request,response);
        }catch (AccessDeniedException | RuntimeException e){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    private String extractToken(String token){
        if(StringUtils.hasText(token) && token.startsWith("Bearer ")){
            return token.substring(7);
        }
        return null;
    }

}
