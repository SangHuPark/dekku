package com.a306.dekku.domain.member.model.entity;

import com.a306.dekku.domain.member.model.entity.enums.ProviderType;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Embeddable
@Builder(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class OAuth2Details {

    @Column(updatable = false, nullable = false)
    @Enumerated(EnumType.STRING)
    private ProviderType provider;

    @Column(updatable = false, nullable = false,  unique = true)
    private String providerId;

    public static OAuth2Details of(ProviderType provider, String providerId) {
        return OAuth2Details.builder()
                .provider(provider)
                .providerId(providerId)
                .build();
    }

}
