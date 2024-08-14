package dekku.spring_dekku.domain.comment.event;

public class CommentCreatedEvent {
    private final Long postId;

    public CommentCreatedEvent(Long postId) {
        this.postId = postId;
    }

    public Long getPostId() {
        return postId;
    }
}