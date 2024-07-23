package dekku.spring_dekku.domain.member.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {
    private String email;
    private String password;
    private String name;
    private String nickname;
    private String phone;
    private String image_url;
    private Timestamp created_at;
}
