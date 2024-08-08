package dekku.spring_dekku.domain.comment.exception;

public class UnauthorizedCommentDeleteException extends RuntimeException {
    public UnauthorizedCommentDeleteException(String message) {
        super(message);
    }
}
