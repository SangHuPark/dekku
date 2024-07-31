package dekku.spring_dekku.domain.liked_post.model.dto;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Builder
public class LikedPostDto {
    private Long userId;
    private Long postId;
    private Timestamp createdAt;
}
