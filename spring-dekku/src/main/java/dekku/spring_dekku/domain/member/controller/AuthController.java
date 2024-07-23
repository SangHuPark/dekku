package dekku.spring_dekku.domain.member.controller;

import dekku.spring_dekku.domain.member.model.dto.LoginRequestDto;
import dekku.spring_dekku.domain.member.model.dto.LoginResponseDto;
import dekku.spring_dekku.domain.member.model.dto.SignUpRequestDto;
import dekku.spring_dekku.domain.member.model.dto.SignUpResponseDto;
import dekku.spring_dekku.domain.member.service.MemberService;
import dekku.spring_dekku.global.security.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

//    @Autowired
//    private CustomUserDetailsService userDetailsService;

    private final MemberService memberService;

    @PostMapping("/signup")
    public SignUpResponseDto signup(@RequestParam String email,
                                    @RequestParam String password,
                                    @RequestParam String name,
                                    @RequestParam String nickname,
                                    @RequestParam String phone) {
        SignUpRequestDto signUpRequestDto = new SignUpRequestDto();
        signUpRequestDto.setEmail(email);
        signUpRequestDto.setPassword(password);
        signUpRequestDto.setName(name);
        signUpRequestDto.setNickname(nickname);
        signUpRequestDto.setPhone(phone);
        signUpRequestDto.setCreated_at(new Timestamp(System.currentTimeMillis()));

        memberService.signup(signUpRequestDto);
        return new SignUpResponseDto("회원가입이 성공적으로 완료되었습니다.");
    }

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
