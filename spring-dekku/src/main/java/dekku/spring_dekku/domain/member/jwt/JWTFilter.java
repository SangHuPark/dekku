package dekku.spring_dekku.domain.member.jwt;

import dekku.spring_dekku.domain.member.model.dto.CustomOAuth2Member;
import dekku.spring_dekku.domain.member.model.dto.MemberDto;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * 이미 액세스 토큰이 있는 경우,
 * 내부에서 사용할 authentication 정보를 set
 */
@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String access = null;
        access = request.getHeader("access");

        System.out.println("JWTFilter -> " + access);

        // access token null
        if (access == null) {
            logger.error("Token is empty");
            filterChain.doFilter(request, response);
            return;
        }

        //token validate
        try {
            logger.error("Token is not vaild");
            if (!jwtTokenProvider.validateToken(access)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        } catch (ExpiredJwtException e) {
            System.out.println("만료");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        } catch (MalformedJwtException e) {
            System.out.println("변조");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        } catch (SignatureException e) {
            System.out.println("signature");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String category = jwtTokenProvider.getCategory(access);

        logger.error("category: " + category);

        // not access token
        if(!category.equals("access")){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        //클라가 보낸 jwt를 읽어서 사용자 이름과 role을 가져옴
        String username = jwtTokenProvider.getUsername(access);
        String role = jwtTokenProvider.getRole(access);

        MemberDto userPrincipal = MemberDto.builder()
                .username(username)
                .role(role)
                .build();

        CustomOAuth2Member customUserDetails = new CustomOAuth2Member(userPrincipal);
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
