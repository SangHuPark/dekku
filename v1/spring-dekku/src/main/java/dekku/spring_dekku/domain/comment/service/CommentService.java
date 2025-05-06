package dekku.spring_dekku.domain.comment.service;

import dekku.spring_dekku.domain.comment.event.CommentCreatedEvent;
import dekku.spring_dekku.domain.comment.event.CommentDeletedEvent;
import dekku.spring_dekku.domain.comment.exception.CommentNotFoundException;
import dekku.spring_dekku.domain.comment.exception.UnauthorizedCommentDeleteException;
import dekku.spring_dekku.domain.comment.model.dto.CommentDto;
import dekku.spring_dekku.domain.comment.model.dto.response.CommentResponseDto;
import dekku.spring_dekku.domain.comment.model.entity.Comment;
import dekku.spring_dekku.domain.comment.repository.CommentRepository;
import dekku.spring_dekku.domain.member.exception.NotExistsUserException;
import dekku.spring_dekku.domain.member.jwt.JwtTokenProvider;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import dekku.spring_dekku.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public void createComment(Long postId, String token, CommentDto commentDto) {
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new NotExistsUserException(ErrorCode.NOT_EXISTS_USER));

        Long memberId = member.getId();

        //내용이 비었거나 글자수 제한 초과에 대한 처리는 validator로 처리할 것이다.
        Comment comment = commentDto.toEntity(postId, memberId, commentDto);
        commentRepository.save(comment);

        // 댓글 수 증가
        eventPublisher.publishEvent(new CommentCreatedEvent(postId));
    }

    @Transactional
    public void deleteComment(String commentId, String token) {
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");
        Long memberId = memberRepository.findByUsername(username)
                .orElseThrow(() -> new NotExistsUserException(ErrorCode.NOT_EXISTS_USER))
                .getId();

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException(ErrorCode.NOT_EXISTS_COMMENT));

        if (!comment.getMemberId().equals(memberId)) {
            throw new UnauthorizedCommentDeleteException(ErrorCode.FAIL_TO_DELETE_UNAUTHORIZED_COMMENT);
        }

        commentRepository.delete(comment);

        // 댓글 수 감소
        Long postId = comment.getPostId();
        eventPublisher.publishEvent(new CommentDeletedEvent(postId));
    }

    @Transactional(readOnly = true)
    public List<Comment> findByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    @Transactional(readOnly = true)
    public List<CommentResponseDto> getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        List<CommentResponseDto> commentResponseDtos = new ArrayList<>();

        for (Comment comment : comments) {
            Long memberId = comment.getMemberId();
            Member member = memberRepository.findById(memberId)
                    .orElseThrow(() -> new NotExistsUserException(ErrorCode.NOT_EXISTS_USER));

            CommentResponseDto commentResponseDto = new CommentResponseDto(
                    comment.getCommentId(),
                    comment.getContent(),
                    member.getNickname(),
                    member.getImageUrl(),
                    memberId
            );

            commentResponseDtos.add(commentResponseDto);
        }

        return commentResponseDtos;
    }
}
