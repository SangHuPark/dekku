package dekku.spring_dekku.domain.member.jwt;

import dekku.spring_dekku.domain.member.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JWTUtil {

    private final SecretKey secretKey;
    private final MemberRepository memberRepository;

    @Value("${spring.jwt.refreshExpiredTime}")
    private Long refreshExpireTime;
    @Value("${spring.jwt.accessExpiredTime}")
    private Long accessExpireTime;

    public JWTUtil(@Value("${spring.jwt.secret}") String secret, MemberRepository memberRepository) {
        String algorithm = Jwts.SIG.HS256.key().build().getAlgorithm();
        System.out.println("algorithm = " + algorithm);
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
        this.memberRepository = memberRepository;
    }

    private Claims getPayload(String token){
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
    }

    public String getUsername(String token){
        return getPayload(token).get("username", String.class);
    }

    public String getRole(String token){
        return getPayload(token).get("role", String.class);
    }

    public String getCategory(String token){
        return getPayload(token).get("category", String.class);
    }

    public Boolean isExpired(String token){
        return getPayload(token).getExpiration().before(new Date());
    }

    public String createJwt(String category, String username, String role, Long expiredMs){
        return Jwts.builder()
                .claim("category", category)
                .claim("username", username)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }

    //vaildate
    public Boolean validateJwt(String token){
        Claims payload = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
        String id = payload.get("username", String.class);
        if (memberRepository.findByUsername(id) != null) {
            return true;
        }
        return false;
    }
}
