package com.a306.dekku.domain.auth.security;

import com.a306.dekku.domain.member.model.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@Builder(access = AccessLevel.PRIVATE)
@Getter
public class CustomOAuth2User implements OAuth2User {

    private final Member member;
    private Map<String, Object> attributes;

    public static CustomOAuth2User of(Member member, Map<String, Object> attributes) {
        return CustomOAuth2User.builder()
                .member(member)
                .attributes(attributes)
                .build();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getName() {
        return member.getNickname();
    }

}
