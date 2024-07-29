package dekku.spring_dekku.domain.stored_post.controller;

import dekku.spring_dekku.domain.stored_post.model.dto.StoredPostDto;
import dekku.spring_dekku.domain.stored_post.service.StoredPostService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stored-posts")
@Tag(name = "Stored Post APIS")
public class StoredPostController {

    private final StoredPostService storedPostService;

    @Autowired
    public StoredPostController(StoredPostService storedPostService) {
        this.storedPostService = storedPostService;
    }

    // 1. 새롭게 추가된 좋아요를 저장
    @PostMapping
    public ResponseEntity<StoredPostDto> createStoredPost(@RequestBody StoredPostDto storedPostDto) {
        StoredPostDto savedPost = storedPostService.saveStoredPost(storedPostDto);
        return ResponseEntity.ok(savedPost);
    }

//    // 2. ID를 이용하여 저장된 게시글을 조회
//    @GetMapping("/{id}")
//    public ResponseEntity<StoredPostDto> getStoredPostById(@PathVariable Long id) {
//        StoredPostDto storedPost = storedPostService.getStoredPostById(id);
//        return storedPost != null ? ResponseEntity.ok(storedPost) : ResponseEntity.notFound().build();
//    }

    // 2. ID를 이용하여 저장된 게시글을 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStoredPost(@PathVariable Long id) {
        storedPostService.deleteStoredPost(id);
        return ResponseEntity.noContent().build();
    }

    // 3. 사용자 ID로 저장된 게시글을 조회하고 총 개수를 반환
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<StoredPostDto>> getStoredPostsByUserId(@PathVariable Long userId) {
        List<StoredPostDto> storedPosts = storedPostService.findByUserId(userId);
        return ResponseEntity.ok(storedPosts);
    }

    // 4. 특정 게시글 ID로 저장된 게시글을 조회하고 총 개수를 반환
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<StoredPostDto>> getStoredPostsByPostId(@PathVariable Long postId) {
        List<StoredPostDto> storedPosts = storedPostService.findByPostId(postId);
        return ResponseEntity.ok(storedPosts);
    }
}
