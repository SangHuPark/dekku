package com.a306.dekku.domain.auth.oAuth2.principal;

import com.a306.dekku.domain.member.model.entity.enums.ProviderType;

public interface OAuth2UserDetails {

    ProviderType getProvider();
    String getProviderId();

}
