package com.a306.dekku.domain.auth.service;

import com.a306.dekku.domain.auth.security.CustomOAuth2User;
import com.a306.dekku.domain.auth.security.OAuth2UserDetails;
import com.a306.dekku.domain.member.model.entity.Member;
import com.a306.dekku.domain.member.model.entity.enums.ProviderType;
import com.a306.dekku.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    /**
     * @param userRequest OAuth2 로그인 요청 객체 (OAuth2 제공자 정보 포함)
     * @return Spring Security에서 사용할 CustomOAuth2User 객체
     * @throws OAuth2AuthenticationException OAuth2 인증 과정에서 오류가 발생할 경우 예외 발생
     */
    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        log.info("getAttributes : {}", oAuth2User.getAttributes());

        ProviderType providerType = ProviderType.convertToEnum(userRequest.getClientRegistration().getRegistrationId());

        OAuth2UserDetails oAuth2UserDetails = OAuth2UserDetailsFactory.getOAuth2UserDetails(providerType, oAuth2User);
        String providerId = oAuth2UserDetails.getProviderId();

        Optional<Member> member = memberRepository.findByProviderId(providerId);

        return CustomOAuth2User.of(
                member.orElseGet(() ->
                        memberRepository.save(
                                Member.builder()
                                        .provider(providerType)
                                        .providerId(providerId)
                                        .build()
                        )),
                oAuth2User.getAttributes()
        );
    }

    /**
     * @param providerId JWT 토큰에 담긴 providerId (OAuth2 제공자의 사용자 ID)
     * @return 인증된 사용자 정보를 포함한 CustomOAuth2User 객체
     * @throws UsernameNotFoundException providerId에 해당하는 회원 정보가 없을 경우 예외 발생
     */
    @Transactional
    public CustomOAuth2User loadUserByProviderId(String providerId) {

        Member member = memberRepository.getOrThrow(providerId);
        return CustomOAuth2User.of(member, Collections.emptyMap());

    }


}
