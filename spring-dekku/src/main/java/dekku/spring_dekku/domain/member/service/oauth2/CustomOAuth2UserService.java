package dekku.spring_dekku.domain.member.service.oauth2;

import dekku.spring_dekku.domain.member.model.dto.*;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import dekku.spring_dekku.domain.member.service.RedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;
    private final RedisService redisService;

    @Transactional
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // userRequest -> registration 정보
        OAuth2UserService<OAuth2UserRequest, OAuth2User> service = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = service.loadUser(userRequest);

        String clientName = userRequest.getClientRegistration().getClientName();

        OAuth2Response response;
        Map<String, Object> attributes = oAuth2User.getAttributes();

//        System.out.println(clientName);
        log.info(userRequest.toString());

        // 존재하는 provider 인지 확인
        if (clientName.equals("naver")) {
            response = new NaverResponse(attributes);
        } else if(clientName.equals("kakao")) {
            response = new KakaoResponse(attributes);
        } else{
            return null;
        }

        // provider name + provider Id 로 username(식별자) 생성
        String username = response.getProvider() + " " + response.getProviderId();
        CustomOAuth2Member customOAuth2Member;
        String role = "ROLE_USER";

        // DB save
        saveOrUpdate(response, username, role);

        // Entity 목적 순수하게 유지하기 위해서 dto 로 전달..
        MemberDto memberDto = MemberDto.builder()
                .username(username)
                .name(response.getName())
                .email(response.getEmail())
                .role(role)
                .build();

        customOAuth2Member = new CustomOAuth2Member(memberDto);

        String accessToken = userRequest.getAccessToken().getTokenValue();
        redisService.setSocialAccessToken(username, accessToken);

        // 서버 내부에서 사용하기 위한 인증 정보
        return customOAuth2Member;
    }

    /**
     * 이미 존재하는 경우 update
     * 존재하지 않는 경우 save
     */
    private void saveOrUpdate(OAuth2Response response, String username, String role) {
        // DB 조회
        Member isExist = memberRepository.findByUsername(username);

        log.info("here --> " + response.getName() + " && " + username + " && " + response.getProvider());

        if (isExist != null) {
            memberRepository.renewMemberInfo(username, response.getName(), response.getEmail(), response.getImageUrl());
        } else {
            Member member = Member.builder()
                    .username(username)
                    .name(response.getName())
                    .email(response.getEmail())
                    .imageUrl(response.getImageUrl())
                    .role(role)
                    .build();
            memberRepository.save(member);
        }
    }
}
