package dekku.spring_dekku.domain.like.model.dto;

import dekku.spring_dekku.domain.like.model.entity.Like;
import lombok.Data;

@Data
public class LikeDto {
    private Long id;
    private Long memberId;
    private Long postId;

    public static LikeDto fromEntity(Like like) {
        LikeDto dto = new LikeDto();
        dto.setId(like.getId());
        dto.setMemberId(like.getMember().getId());
        dto.setPostId(like.getDeskteriorPost().getId());
        return dto;
    }
}
