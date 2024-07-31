package dekku.spring_dekku.domain.liked_post.controller;

import dekku.spring_dekku.domain.liked_post.model.dto.LikedPostDto;
import dekku.spring_dekku.domain.liked_post.service.LikedPostService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/liked-posts")
@Tag(name = "Liked Post APIS")
public class LikedPostController {

    private final LikedPostService likedPostService;

    @Autowired
    public LikedPostController(LikedPostService likedPostService) {
        this.likedPostService = likedPostService;
    }

    // 1. 새롭게 추가된 좋아요를 저장
    @PostMapping
    public ResponseEntity<LikedPostDto> saveLikedPost(@RequestBody LikedPostDto likedPostDto) {
        LikedPostDto savedPost = likedPostService.saveStoredPost(likedPostDto);
        return ResponseEntity.ok(savedPost);
    }

    // 2. ID를 이용하여 저장된 게시글을 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLikedPost(@PathVariable Long id) {
        likedPostService.deleteLikedPost(id);
        return ResponseEntity.noContent().build();
    }

    // 3. 사용자 ID로 저장된 게시글을 조회하고 총 개수를 반환
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LikedPostDto>> getLikedPostsByUserId(@PathVariable Long userId) {
        List<LikedPostDto> likedPosts = likedPostService.findByUserId(userId);
        return ResponseEntity.ok(likedPosts);
    }

    // 4. 특정 게시글 ID로 저장된 게시글을 조회하고 총 개수를 반환
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<LikedPostDto>> getLikedPostsByPostId(@PathVariable Long postId) {
        List<LikedPostDto> likedPosts = likedPostService.findByPostId(postId);
        return ResponseEntity.ok(likedPosts);
    }
}
