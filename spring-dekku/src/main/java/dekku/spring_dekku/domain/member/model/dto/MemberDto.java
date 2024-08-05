package dekku.spring_dekku.domain.member.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberDto {
    private String username;
    private String name;
    private String email;
    private String role;
    private Integer ageRange;
    private String gender;

    //update
    @Builder
    public MemberDto(String username, String name, String email, String role, Integer ageRange) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.role = role;
        this.ageRange = ageRange;
    }

    //kakao
    @Builder
    public MemberDto(String username, String name, String email, String role) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    //naver
    @Builder
    public MemberDto(String username, String name, String email, String role, Integer ageRange, String gender) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.role = role;
        this.ageRange = ageRange;
        this.gender = gender;
    }
}
