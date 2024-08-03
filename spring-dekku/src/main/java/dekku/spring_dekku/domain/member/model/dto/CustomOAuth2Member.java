package dekku.spring_dekku.domain.member.model.dto;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@RequiredArgsConstructor
public class CustomOAuth2Member implements OAuth2User {
    private final MemberDto memberDto;

    // 통일 x -> return null
    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return memberDto.getRole();
            }
        });
        return collection;
    }

    @Override
    public String getName() {
        return memberDto.getName();
    }

    public String getUsername(){
        return memberDto.getUsername();
    }
    public String getEmail(){
        return memberDto.getEmail();
    }
    public Integer getAgeRange(){
        return memberDto.getAgeRange();
    }
}
