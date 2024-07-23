package dekku.spring_dekku.domain.deskterior_post.controller;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.service.DeskteriorPostService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deskterior-posts")
@Tag(name = "DeskteriorPost APIS")
@RequiredArgsConstructor
public class DeskteriorPostController {

    private final DeskteriorPostService service;

    // 1. 모든 게시물 조회
    @GetMapping
    public List<DeskteriorPost> getAllPosts() {
        return service.findAll();
    }

    // 2. ID로 게시물 조회
    @GetMapping("/{postId}")
    public ResponseEntity<DeskteriorPost> getPostById(@PathVariable Long postId) {
        return service.findById(postId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 3. 게시물 생성
    @PostMapping
    public DeskteriorPost createPost(@RequestBody DeskteriorPost post) {
        return service.createPost(post);
    }

    // 4. 게시물 수정
    @PutMapping("/{postId}")
    public ResponseEntity<DeskteriorPost> updatePost(@PathVariable Long postId, @RequestBody DeskteriorPost postDetails) {
        try {
            DeskteriorPost updatedPost = service.updatePost(postId, postDetails);
            return ResponseEntity.ok(updatedPost);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 5. ID로 게시물 삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        service.deleteById(postId);
        return ResponseEntity.noContent().build();
    }

    // 6. 제목에 특정 키워드를 포함하는 게시물 조회
    @GetMapping("/search")
    public List<DeskteriorPost> searchPostsByTitle(@RequestParam String keyword) {
        return service.findPostsByTitleContaining(keyword);
    }
}
