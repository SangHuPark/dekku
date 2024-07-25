package dekku.spring_dekku.global.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import dekku.spring_dekku.domain.member.model.dto.request.LoginRequestDto;
import dekku.spring_dekku.domain.member.service.MemberService;
import dekku.spring_dekku.infra.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;

// 웹 형태에서 효율적인 UsernamePasswordAuthenticationFilter
@Slf4j
@RequiredArgsConstructor
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final JwtUtil jwtUtil;

    private final MemberService memberService;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        log.info("로그인 요청을 filter 가 받음");

        try {

            // request 를 ObjectMapper 를 통해 LoginRequestDto 로 username, password 를 받아옴
            LoginRequestDto loginRequestDto =
                    new ObjectMapper().readValue(request.getInputStream(), LoginRequestDto.class);

            // 임시 auth 토큰 생성
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword());

            // authenticationManager 에 임시 토큰으로 로그인 시도
            // authenticate() 에 토큰을 넘기면 loadUserByUsername() 실행 -> DB 에 저장된 정보와 일치하면 authentication 이 생성됨
            Authentication authentication =
                    getAuthenticationManager().authenticate(authenticationToken);

            log.info("로그인 성공");

            return authentication;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    // attemptAuthentication() 에서 인증이 정상적으로 완료되면 실행되는 함수
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        log.info("인증 완료");

        Principal principal = (Principal) authResult.get;

        String accessToken = jwtUtil.generateAccessToken(principal);

        super.successfulAuthentication(request, response, chain, authResult);
    }
}
