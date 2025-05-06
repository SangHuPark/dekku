package dekku.spring_dekku.domain.comment.model.dto;

import dekku.spring_dekku.domain.comment.model.entity.Comment;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class CommentDto {
    @Size(min = 1, max = 50)
    private String content;

    public Comment toEntity(Long postId, Long memberId, CommentDto commentDto) {
        Comment comment = new Comment();
        comment.setPostId(postId);
        comment.setMemberId(memberId);
        comment.setContent(commentDto.content);
        return comment;
    }
}
