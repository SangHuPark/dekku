package com.a306.dekku.domain.auth.oAuth2.principal;

import com.a306.dekku.domain.auth.oAuth2.model.dto.KakaoUserProfile;
import com.a306.dekku.domain.member.model.entity.enums.ProviderType;

import java.util.Map;

public class KakaoUserDetails implements OAuth2UserDetails {

    private KakaoUserProfile kakaoUserProfile;

    public KakaoUserDetails(Map<String, Object> attributes) {
        this.kakaoUserProfile = new KakaoUserProfile(attributes);
    }

    @Override
    public ProviderType getProvider() {
        return ProviderType.KAKAO;
    }

    @Override
    public String getProviderId() {
        return kakaoUserProfile.getProviderId();
    }
}
