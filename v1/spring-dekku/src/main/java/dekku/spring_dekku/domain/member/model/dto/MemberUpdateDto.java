package dekku.spring_dekku.domain.member.model.dto;

import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record MemberUpdateDto(
        @Size(min = 1, max = 20)
        String nickname,
        Integer ageRange,
        @Size(max = 30)
        String introduction,
        String gender,
        String imageUrl) {
}
