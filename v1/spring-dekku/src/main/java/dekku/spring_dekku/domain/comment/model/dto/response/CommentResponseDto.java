package dekku.spring_dekku.domain.comment.model.dto.response;

public record CommentResponseDto(
        String id,
        String content,
        String memberNickname,
        String memberImageUrl,
        Long memberId
) {}