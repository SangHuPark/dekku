package dekku.spring_dekku.domain.comment.service;

import dekku.spring_dekku.domain.comment.exception.CommentNotFoundException;
import dekku.spring_dekku.domain.comment.exception.UnauthorizedCommentDeleteException;
import dekku.spring_dekku.domain.comment.model.dto.CommentDto;
import dekku.spring_dekku.domain.comment.model.dto.response.CommentResponseDto;
import dekku.spring_dekku.domain.comment.model.entity.Comment;
import dekku.spring_dekku.domain.comment.repository.CommentRepository;
import dekku.spring_dekku.domain.member.exception.MemberNotFoundException;
import dekku.spring_dekku.domain.member.jwt.JwtTokenProvider;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
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

    @Transactional
    public void createComment(Long postId, String token, CommentDto commentDto) {
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new MemberNotFoundException("멤버를 찾을 수 없습니다.");
        }
        Long memberId = memberRepository.findByUsername(username).getId();
        //내용이 비었거나 글자수 제한 초과에 대한 처리는 validator로 처리할 것이다.
        Comment comment = commentDto.toEntity(postId, memberId, commentDto);
        commentRepository.save(comment);
    }

    @Transactional
    public void deleteComment(String commentId, String token) {
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");
        Long memberId = memberRepository.findByUsername(username).getId();

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("댓글을 찾을 수 없습니다."));

        if (!comment.getMemberId().equals(memberId)) {
            throw new UnauthorizedCommentDeleteException("댓글을 삭제할 권한이 없습니다.");
        }

        commentRepository.delete(comment);
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
                    .orElseThrow(() -> new MemberNotFoundException("Member not found with id: " + memberId));

            CommentResponseDto commentResponseDto = new CommentResponseDto(
                    comment.getContent(),
                    member.getNickname(),
                    member.getImageUrl()
            );

            commentResponseDtos.add(commentResponseDto);
        }

        return commentResponseDtos;
    }
}
