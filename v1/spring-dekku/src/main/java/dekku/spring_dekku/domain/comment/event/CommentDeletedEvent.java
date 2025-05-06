package dekku.spring_dekku.domain.comment.event;

public class CommentDeletedEvent {
    private final Long postId;

    public CommentDeletedEvent(Long postId) {
        this.postId = postId;
    }

    public Long getPostId() {
        return postId;
    }
}