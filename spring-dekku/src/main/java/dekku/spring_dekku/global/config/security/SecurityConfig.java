package dekku.spring_dekku.global.config.security;

import dekku.spring_dekku.domain.member.jwt.JWTFilter;
import dekku.spring_dekku.domain.member.jwt.JWTUtil;
import dekku.spring_dekku.domain.member.repository.RefreshRepository;
import dekku.spring_dekku.domain.member.service.RefreshTokenService;
import dekku.spring_dekku.domain.member.service.oauth2.CustomOAuth2UserService;
import dekku.spring_dekku.global.filter.CustomLogoutFilter;
import dekku.spring_dekku.global.handler.CustomOAuth2SuccessHandler;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final JWTUtil jwtUtil;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final RefreshTokenService refreshTokenService;
    private final RefreshRepository refreshRepository;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity

                .httpBasic(HttpBasicConfigurer::disable)

                .csrf(CsrfConfigurer::disable)

                .formLogin((form) -> form.disable())

                .cors(cors -> cors.disable());

        httpSecurity
                .oauth2Login((oauth2) -> oauth2
                        .loginPage("/login")
                        .userInfoEndpoint((userinfo) -> userinfo
                                .userService(customOAuth2UserService))
                        .successHandler(new CustomOAuth2SuccessHandler(jwtUtil, refreshTokenService))
                        .failureHandler(authenticationFailureHandler())
                        .permitAll());

        httpSecurity
                .logout((auth) -> auth
                        .logoutSuccessUrl("/")
                        .permitAll());

        // 인가되지 않은 사용자에 대한 exception
        httpSecurity.exceptionHandling((exception) ->
                exception
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        }));

        // jwt filter
        httpSecurity
                .addFilterAfter(new JWTFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

        // custom logout filter 등록
        httpSecurity
                .addFilterBefore(new CustomLogoutFilter(jwtUtil, refreshRepository), LogoutFilter.class);

        // session stateless
        httpSecurity
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return httpSecurity.getOrBuild();

    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-resources/**")
                .requestMatchers("/h2-console/**")
                .requestMatchers(
                        "/auth/**", "/sign-up/**", "/verification/**",
                        "/users/find-password", "/users/update-password", "/s3/**", "/test")
                .requestMatchers("/api/**");
    }


    @Bean
    public AuthenticationManager authenticationManagerBean() {
        return authentication -> authentication;
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler(){
        return (request, response, exception) -> {
            System.out.println("exception = " + exception);
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        };
    }


}