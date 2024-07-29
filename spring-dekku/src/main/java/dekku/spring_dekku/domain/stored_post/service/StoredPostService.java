package dekku.spring_dekku.domain.stored_post.service;

import dekku.spring_dekku.domain.stored_post.model.dto.StoredPostDto;
import dekku.spring_dekku.domain.stored_post.model.entity.StoredPost;
import dekku.spring_dekku.domain.stored_post.repository.StoredPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StoredPostService {

    private final StoredPostRepository storedPostRepository;

    @Autowired
    public StoredPostService(StoredPostRepository storedPostRepository) {
        this.storedPostRepository = storedPostRepository;
    }

    // 1. 새롭게 추가된 좋아요를 저장
    public StoredPostDto saveStoredPost(StoredPostDto storedPostDto) {
        StoredPost storedPost = StoredPost.builder()
                .userId(storedPostDto.getUserId())
                .postId(storedPostDto.getPostId())
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .build();

        StoredPost savedPost = storedPostRepository.save(storedPost);

        return StoredPostDto.builder()
                .storedId(savedPost.getStoredId())
                .userId(savedPost.getUserId())
                .postId(savedPost.getPostId())
                .createdAt(savedPost.getCreatedAt())
                .build();
    }

//    // 2. ID를 이용하여 저장된 게시글을 조회
//    public StoredPostDto getStoredPostById(Long id) {
//        Optional<StoredPost> storedPost = storedPostRepository.findById(id);
//        return storedPost.map(post -> StoredPostDto.builder()
//                .storedId(post.getStoredId())
//                .userId(post.getUserId())
//                .postId(post.getPostId())
//                .createdAt(post.getCreatedAt())
//                .build()).orElse(null);
//    }

    // 2. ID를 이용하여 저장된 게시글을 삭제
    public void deleteStoredPost(Long id) {
        storedPostRepository.deleteById(id);
    }

    // 3. 사용자 ID로 저장된 게시글을 조회하고 총 개수를 반환
    public List<StoredPostDto> findByUserId(Long userId) {
        List<StoredPost> storedPosts = storedPostRepository.findByUserId(userId);
//        System.out.println("Total stored posts by userId " + userId + ": " + storedPosts.size());
        return storedPosts.stream()
                .map(post -> StoredPostDto.builder()
                        .storedId(post.getStoredId())
                        .userId(post.getUserId())
                        .postId(post.getPostId())
                        .createdAt(post.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    // 4. 특정 게시글 ID로 저장된 게시글을 조회하고 총 개수를 반환
    public List<StoredPostDto> findByPostId(Long postId) {
        List<StoredPost> storedPosts = storedPostRepository.findByPostId(postId);
//        System.out.println("Total stored posts by postId " + postId + ": " + storedPosts.size());
        return storedPosts.stream()
                .map(post -> StoredPostDto.builder()
                        .storedId(post.getStoredId())
                        .userId(post.getUserId())
                        .postId(post.getPostId())
                        .createdAt(post.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
