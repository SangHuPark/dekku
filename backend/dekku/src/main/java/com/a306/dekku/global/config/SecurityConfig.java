package com.a306.dekku.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    public static final String[] SWAGGER_URI = {
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui",
            "/swagger-ui.html",
            "/swagger-ui/index.html",
            "/webjars/**",
            "/swagger-resources/**"
    };

    private final CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        return http
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .headers(header -> header.frameOptions(FrameOptionsConfig::sameOrigin))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                        .requestMatchers(SWAGGER_URI).permitAll()  // ✅ Swagger UI 인증 없이 허용
                        .requestMatchers("/api/**").permitAll()
//                        .requestMatchers("/api/v1/public/**").permitAll()
                        .anyRequest().authenticated()
                )

//                .addFilterBefore(new AuthorizationFilter(jwtService), UsernamePasswordAuthenticationFilter.class)
//                .exceptionHandling(handling -> handling
//                        .accessDeniedHandler(accessDeniedHandler)
//                        .authenticationEntryPoint(authenticationEntryPoint)
//                )
                .build();
    }
}
