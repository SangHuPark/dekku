package dekku.spring_dekku.domain.product.model.dto.response;

import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.DeskteriorAttributes;

import java.util.Collection;
import java.util.List;

public record CreatePostProductMatchResponseDto (
        Long postId, // 게시물 ID
        List<Long> matchingProductIds, // 겹치는 상품 ID 리스트
        String memberNickName, // 회원 닉네임
        String memberImage, // 회원 이미지
        String title, // 게시물 제목
        String content, // 게시물 내용
        String thumbnail, // 썸네일 이미지
        int viewCount, // 조회수
        int likeCount, // 좋아요 수
        int commentCount, // 댓글 수
        DeskteriorAttributes deskteriorAttributes // 게시물 속성 (색상, 스타일 등)
) { }