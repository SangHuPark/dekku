package dekku.spring_dekku.domain.member.jwt;

import dekku.spring_dekku.domain.member.model.entity.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("${spring.jwt.secret}")
    private String key;

    private final AuthenticationManager authenticationManager;

    public String generateToken(Member user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getUsername());
//        claims.put("gender", user.getGender());
//        claims.put("age", user.getAge());
//        claims.put("nickName", user.getNickName());
        claims.put("name", user.getName());
//        claims.put("profileImage", user.getProfileImage());
//        claims.put("regDate", user.getCreatedDate().toString());
        return doGenerateToken(claims, user.getUsername());
    }

    private String doGenerateToken(Map<String, Object> claims, String subject) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(subject, key);
        try {
            Authentication authentication = authenticationManager.authenticate(authToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("##### doGenerateToken :: 로그인성공");
        } catch (BadCredentialsException ex) {
            log.info("##### doGenerateToken :: 로그인실패");
        }
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 180 * 180 * 30))
                .signWith(SignatureAlgorithm.HS512, key).compact();
    }

    public String getUserSubjectFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        SecretKey signingKey = Keys.hmacShaKeyFor(key.getBytes());
        return Jwts.parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String getKeyFromClaims(String token, String claimKey) {
        final Claims claims = getAllClaimsFromToken(token);
        return claims.get(claimKey, String.class);
    }


    public Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public Boolean validateToken(String token) {
        final String username = getUserSubjectFromToken(token);
        return !isTokenExpired(token) && !TokenBlacklist.isTokenBlacklisted(token);
    }

    public void invalidateToken(String token) {
        TokenBlacklist.blacklistToken(token);
    }
}
