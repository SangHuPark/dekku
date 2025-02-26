package com.a306.dekku.domain.auth.oAuth2.model.dto;

import java.util.Map;

public class KakaoUserProfile implements OAuth2UserProfile {

    private final String id;

    public KakaoUserProfile(Map<String, Object> attributes) {
        this.id = String.valueOf(attributes.get("id"));
    }

    @Override
    public String getProviderId() {
        return id;
    }

}
