package dekku.spring_dekku.domain.member.model.dto.request;

import dekku.spring_dekku.domain.member.model.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateMemberRequestDto {

    private String email;
    private String password;
    private String name;
    private String nickname;
    private String image_url;
    private String created_at;

    // 변환이 필요한 것만
    public Member toEntity(String encryptPassword, String image_url) {

        return Member.builder()
                .email(this.email)
                .password(encryptPassword)
                .name(this.name)
                .nickname(this.nickname)
                .image_url(image_url)
                .build();
    }
}
