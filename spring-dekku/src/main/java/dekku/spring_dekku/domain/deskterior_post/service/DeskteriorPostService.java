package dekku.spring_dekku.domain.deskterior_post.service;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class DeskteriorPostService {

    @Autowired
    private DeskteriorPostRepository deskteriorPostRepository;

    // 1. 모든 게시물 조회
    public List<DeskteriorPost> findAll() {
        return deskteriorPostRepository.findAll();
    }

    // 2. ID로 게시물 조회
    public Optional<DeskteriorPost> findById(Long postId) {
        return deskteriorPostRepository.findById(postId);
    }

    // 3. 게시물 생성
    public DeskteriorPost createPost(DeskteriorPost post) {
        DeskteriorPost deskteriorPost = DeskteriorPost.builder()
                .title(post.getTitle())
                .thumbnailUrl(post.getThumbnailUrl())
                .content(post.getContent())
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .modifiedAt(new Timestamp(System.currentTimeMillis()))
                .deskteriorImageId(post.getDeskteriorImageId())
                .userId(post.getUserId())
                .build();
        return deskteriorPostRepository.save(deskteriorPost);
    }

    // 4. 게시물 수정
    public DeskteriorPost updatePost(Long postId, DeskteriorPost postDetails) {
        return deskteriorPostRepository.findById(postId)
                .map(post -> {
                    DeskteriorPost updatedPost = DeskteriorPost.builder()
                            .id(postId)
                            .title(postDetails.getTitle())
                            .thumbnailUrl(postDetails.getThumbnailUrl())
                            .content(postDetails.getContent())
                            .createdAt(post.getCreatedAt())
                            .modifiedAt(new Timestamp(System.currentTimeMillis()))
                            .deskteriorImageId(postDetails.getDeskteriorImageId())
                            .userId(postDetails.getUserId())
                            .build();
                    return deskteriorPostRepository.save(updatedPost);
                })
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id " + postId));
    }

    // 5. ID로 게시물 삭제
    public void deleteById(Long postId) {
        deskteriorPostRepository.deleteById(postId);
    }

    // 6. 제목에 특정 키워드를 포함하는 게시물 조회
    public List<DeskteriorPost> findPostsByTitleContaining(String keyword) {
        return deskteriorPostRepository.findPostsByTitleContaining(keyword);
    }
}
