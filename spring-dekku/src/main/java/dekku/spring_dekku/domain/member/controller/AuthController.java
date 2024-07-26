package dekku.spring_dekku.domain.member.controller;

import dekku.spring_dekku.domain.member.model.dto.request.LoginRequestDto;
import dekku.spring_dekku.domain.member.model.dto.response.LoginResponseDto;
import dekku.spring_dekku.domain.member.model.dto.request.CreateMemberRequestDto;
import dekku.spring_dekku.domain.member.model.dto.response.CreateMemberResponseDto;
import dekku.spring_dekku.domain.member.service.MemberService;
import dekku.spring_dekku.infra.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;

//    @Autowired
//    private CustomUserDetailsService userDetailsService;

    private final MemberService memberService;

    @PostMapping("/login")
    public LoginResponseDto login(@RequestParam String email, @RequestParam String password) {
        LoginRequestDto loginRequestDto = new LoginRequestDto();
        loginRequestDto.setEmail(email);
        loginRequestDto.setPassword(password);

        String token = memberService.login(loginRequestDto);
        return new LoginResponseDto(token);
    }


    @GetMapping("/logout")
    public String logout() {
        // 로그아웃 로직을 추가하세요 (예: 세션 무효화, 토큰 블랙리스트 등)
        return "Logged out successfully";
    }

    @GetMapping("/access-token")
    public String getAccessToken(@RequestParam String refreshToken) {
        // Refresh Token을 사용하여 Access Token을 발급하는 로직을 추가하세요
        return "New Access Token";
    }



}
