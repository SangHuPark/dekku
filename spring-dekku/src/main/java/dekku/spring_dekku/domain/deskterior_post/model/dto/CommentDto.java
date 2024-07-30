package dekku.spring_dekku.domain.deskterior_post.model.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Builder
public class CommentDto {
    @Id
    private Long postId;
    private Long userId;
    private String content;
    private Timestamp createdAt;
    private Timestamp modifiedAt;
    private List<ReplyDto> replies;
}
