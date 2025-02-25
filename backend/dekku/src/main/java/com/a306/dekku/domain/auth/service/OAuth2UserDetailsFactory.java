package com.a306.dekku.domain.auth.service;

import com.a306.dekku.domain.auth.exception.InvalidProviderTypeException;
import com.a306.dekku.domain.auth.security.KakaoUserDetails;
import com.a306.dekku.domain.auth.security.OAuth2UserDetails;
import com.a306.dekku.domain.member.model.entity.enums.ProviderType;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class OAuth2UserDetailsFactory {

    public static OAuth2UserDetails getOAuth2UserDetails(ProviderType provider, OAuth2User oAuth2User) {

        return switch (provider) {
            case KAKAO -> new KakaoUserDetails(oAuth2User.getAttributes());
            default -> throw new InvalidProviderTypeException();
        };

    }

}
