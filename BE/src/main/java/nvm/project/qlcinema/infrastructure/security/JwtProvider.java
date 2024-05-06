package nvm.project.qlcinema.infrastructure.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.entity.Client;
import nvm.project.qlcinema.entity.User;
import nvm.project.qlcinema.infrastructure.constant.AuthenticationMessage;
import nvm.project.qlcinema.infrastructure.constant.TypeUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    @Value("${jwt.secretKey}")
    private String secret;

    private final UserDetailsService userDetailsService;

    public Claims extractPayload(String token) {
        return Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(secret.getBytes()))
                .build()
                .parseClaimsJws(token).getBody();
    }

    public String extractUserName(String token) {
        return extractPayload(token).getSubject();
    }

    public String extractTypeUser(String token) {
        return (String) extractPayload(token).get("typeUser");
    }

    public AuthenticationMessage isTokenValid(String token) {
        try {
            //Decode from the token with secretKey
            Claims claims = extractPayload(token);
            //Get ExpirationDate from the token
            Date expirationDate = claims.getExpiration();
            //Compare ExpirationDate from the token to now
            if (!expirationDate.before(new Date())) {
                return AuthenticationMessage.TOKEN_VALID;
            } else {
                return AuthenticationMessage.TOKEN_EXPIRATION;
            }
        } catch (ExpiredJwtException e) {
            return AuthenticationMessage.TOKEN_EXPIRATION;
        } catch (Exception e) {
            return AuthenticationMessage.TOKEN_INVALID;
        }
    }

    public AuthenticationMessage isTokenCloseToExpiration(String token) {
        //Decode from the token with secretKey
        Claims claims = extractPayload(token);
        //Get ExpirationDate from the token
        Date expirationDate = claims.getExpiration();
        // Lấy thời điểm hiện tại
        Date currentTime = new Date();
        // Tạo một đối tượng Date đại diện cho thời điểm hiện tại cộng thêm 2 tiếng
        Calendar cal = Calendar.getInstance();
        cal.setTime(currentTime);
        cal.add(Calendar.HOUR, 2); // 2 tiếng
        Date fifteenMinutesLater = cal.getTime();
        if(expirationDate.after(currentTime) && expirationDate.before(fifteenMinutesLater)){
            return AuthenticationMessage.TOKEN_NEED_TO_REFRESH;
        }else if(expirationDate.before(new Date())){ //Refresh token expiration
            return AuthenticationMessage.REFRESH_TOKEN_EXPIRATION;
        }
        return AuthenticationMessage.TOKEN_VALID;
    }

    public String generateToken(String username) {
        //Get UserDetail
        User user = (User) userDetailsService.loadUserByUsername(username);
        //create ExtraUser to put into Claims
        Map<String, Object> extraUser = new HashMap<>();
        extraUser.put("username", user.getUsername());
        extraUser.put("roles", user.getAuthorities());
        extraUser.put("email", user.getEmail());
        extraUser.put("areaId", user.getAreaId().getId());
        extraUser.put("userImage", user.getImageUrl());
        extraUser.put("userFullName", user.getName());
        extraUser.put("userId", user.getId());
        extraUser.put("typeUser", TypeUser.USER.getType());
        if (user.getBranchId() != null) {
            extraUser.put("branchId", user.getBranchId().getId());
        }
        //Write setClaims on the top to prevent overwrite the behind
        return Jwts.builder()
                .setClaims(extraUser)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 24)))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateTokenClient(Client client) {
        //create ExtraUser to put into Claims
        Map<String, Object> extraUser = new HashMap<>();
        extraUser.put("id", client.getId());
        extraUser.put("image", client.getImageUrl());
        extraUser.put("province", client.getProvince());
        extraUser.put("fullName", client.getName());
        extraUser.put("typeUser", TypeUser.CLIENT.getType());
        //Write setClaims on the top to prevent overwrite the behind
        return Jwts.builder()
                .setClaims(extraUser)
                .setSubject(client.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 24)))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshTokenClient() {
        return Jwts.builder()
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 24)))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

}
