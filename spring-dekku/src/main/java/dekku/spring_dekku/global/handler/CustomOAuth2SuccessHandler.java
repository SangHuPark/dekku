package dekku.spring_dekku.global.handler;

import dekku.spring_dekku.domain.member.jwt.CookieUtil;
import dekku.spring_dekku.domain.member.jwt.JwtTokenProvider;
import dekku.spring_dekku.domain.member.model.dto.CustomOAuth2Member;
import dekku.spring_dekku.domain.member.service.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.net.URLEncoder;

/**
 * OAuth2 로그인 성공 후 JWT 발급
 * access, refresh -> httpOnly 쿠키
 * 리다이렉트 되기 때문에 헤더로 전달 불가능
 */
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenService refreshTokenService;

    private final Long accessExpiredTime = 3600000L;
    private final Long refreshExpiredTime = 86400000L;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        // create JWT
        CustomOAuth2Member customOAuth2Member = (CustomOAuth2Member) authentication.getPrincipal();

        String name = customOAuth2Member.getName(); // 실제 이름
        String username = customOAuth2Member.getUsername(); // DB 저장용 식별자
        String role = authentication.getAuthorities().iterator().next().getAuthority();

        String access = jwtTokenProvider.createJwt("access", username, role, accessExpiredTime);
        String refresh = jwtTokenProvider.createJwt("refresh", username, role, refreshExpiredTime);

        // refresh 토큰 DB 저장
        refreshTokenService.saveRefresh(username, refreshExpiredTime, refresh);

        response.addCookie(CookieUtil.createCookie("access", access, accessExpiredTime));
        response.addCookie(CookieUtil.createCookie("refresh", refresh, refreshExpiredTime));

        // redirect query param 인코딩 후 전달
        // 이후에 JWT 를 읽어서 데이터를 가져올 수도 있지만, JWT 파싱 비용이 많이 들기 때문에
        // 처음 JWT 발급할 때 이름을 함께 넘긴 후, 로컬 스토리지에 저장한다.
        String encodedName = URLEncoder.encode(name, "UTF-8");
        response.sendRedirect("http://dekku.co.kr:3000/oauth2-jwt-header?name=" + encodedName);
    }

}

