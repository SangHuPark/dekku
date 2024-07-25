package dekku.spring_dekku.domain.member.model.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginRequestDto {

    @NotNull(message = "이메일을 입력하세요.")
    private String email;

    @NotNull(message = "비밀번호를 입력하세요.")
    private String password;
}
