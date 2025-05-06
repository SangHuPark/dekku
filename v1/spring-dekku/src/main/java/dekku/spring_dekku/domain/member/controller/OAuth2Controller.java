package dekku.spring_dekku.domain.member.controller;

import dekku.spring_dekku.domain.member.service.oauth2.OAuth2JwtHeaderService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * OAuth2 로그인 시 바로 응답을 할 수 없기 때문에 리다이렉트 하여 쿠키로 토큰을 보냄 (액세스+리프레시)
 * httpOnly 쿠키 저장 시 xss 공격은 막을 수 있지만, csrf 공격에 취약하다
 * -> 백엔드 서버로 재요청하여 헤더에 담아서 보냄. 프론트엔드는 로컬스토리지에 액세스 토큰 저장
 */
@RestController
@RequiredArgsConstructor
public class OAuth2Controller {
    private static final Logger log = LoggerFactory.getLogger(OAuth2Controller.class);
    private final OAuth2JwtHeaderService oAuth2JwtHeaderService;

    @PostMapping("/api/oauth2-jwt-header")
    public String oauth2JwtHeader(HttpServletRequest request, HttpServletResponse response) {
        log.info("request: {}", request);
        log.info("response: {}", response);
        return oAuth2JwtHeaderService.oauth2JwtHeaderSet(request, response);
    }
}
