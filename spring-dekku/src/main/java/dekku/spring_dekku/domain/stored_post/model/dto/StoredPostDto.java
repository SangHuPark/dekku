package dekku.spring_dekku.domain.stored_post.model.dto;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Builder
public class StoredPostDto {
    private Long storedId;
    private Long userId;
    private Long postId;
    private Timestamp createdAt;
}
