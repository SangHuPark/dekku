package com.a306.dekku.domain.auth.security;

import com.a306.dekku.domain.member.model.entity.enums.ProviderType;

public interface OAuth2UserDetails {

    ProviderType getProvider();
    String getProviderId();

}
