package dekku.spring_dekku.domain.liked_post.service;

import dekku.spring_dekku.domain.liked_post.model.dto.LikedPostDto;
import dekku.spring_dekku.domain.liked_post.model.entity.LikedPost;
import dekku.spring_dekku.domain.liked_post.repository.LikedPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LikedPostService {

    private final LikedPostRepository likedPostRepository;

    @Autowired
    public LikedPostService(LikedPostRepository likedPostRepository) {
        this.likedPostRepository = likedPostRepository;
    }

    // 1. 새롭게 추가된 좋아요를 저장
    public LikedPostDto saveStoredPost(LikedPostDto likedPostDto) {
        LikedPost likedPost = LikedPost.builder()
                .userId(likedPostDto.getUserId())
                .postId(likedPostDto.getPostId())
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .build();

        LikedPost savedPost = likedPostRepository.save(likedPost);

        return LikedPostDto.builder()
                .userId(savedPost.getUserId())
                .postId(savedPost.getPostId())
                .createdAt(savedPost.getCreatedAt())
                .build();
    }

    // 2. ID를 이용하여 저장된 게시글을 삭제
    public void deleteLikedPost(Long id) {
        if (!likedPostRepository.existsById(id)) {
            throw new IllegalArgumentException("Post not found with id: " + id);
        }
        LikedPost postToDelete = likedPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));
        likedPostRepository.deleteById(id);
    }

    // 3. 사용자 ID로 저장된 게시글을 조회하고 총 개수를 반환
    public List<LikedPostDto> findByUserId(Long userId) {
        List<LikedPost> storedPosts = likedPostRepository.findByUserId(userId);
//        System.out.println("Total stored posts by userId " + userId + ": " + storedPosts.size());
        return storedPosts.stream()
                .map(post -> LikedPostDto.builder()
                        .userId(post.getUserId())
                        .postId(post.getPostId())
                        .createdAt(post.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    // 4. 특정 게시글 ID로 저장된 게시글을 조회하고 총 개수를 반환
    public List<LikedPostDto> findByPostId(Long postId) {
        List<LikedPost> likedPosts = likedPostRepository.findByPostId(postId);
//        System.out.println("Total stored posts by postId " + postId + ": " + storedPosts.size());
        return likedPosts.stream()
                .map(post -> LikedPostDto.builder()
                        .userId(post.getUserId())
                        .postId(post.getPostId())
                        .createdAt(post.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
