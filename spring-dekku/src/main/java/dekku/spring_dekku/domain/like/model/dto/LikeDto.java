package dekku.spring_dekku.domain.like.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LikeDto {
    private Long id;
    private Long memberId;
    private Long postId;
}
