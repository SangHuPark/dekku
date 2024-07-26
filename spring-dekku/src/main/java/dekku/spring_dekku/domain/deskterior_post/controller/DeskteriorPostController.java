package dekku.spring_dekku.domain.deskterior_post.controller;

import dekku.spring_dekku.domain.deskterior_post.model.dto.DeskteriorPostDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.DeskteriorPostRequest;
import dekku.spring_dekku.domain.deskterior_post.service.DeskteriorPostService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deskterior_posts")
@Tag(name = "Deskterior Post APIS")
public class DeskteriorPostController {

    private final DeskteriorPostService deskteriorPostService;

    @Autowired
    public DeskteriorPostController(DeskteriorPostService deskteriorPostService) {
        this.deskteriorPostService = deskteriorPostService;
    }

    // 1. 모든 게시물 조회
    @GetMapping
    public ResponseEntity<List<DeskteriorPostDto>> getAllPosts() {
        List<DeskteriorPostDto> posts = deskteriorPostService.findAll();
        return ResponseEntity.ok(posts);
    }

    // 2. ID로 게시물 조회
    @GetMapping("/{id}")
    public ResponseEntity<DeskteriorPostDto> getPostById(@PathVariable Long id) {
        DeskteriorPostDto post = deskteriorPostService.findById(id);
        return ResponseEntity.ok(post);
    }

    // 3. 게시물 생성
    @PostMapping
    public ResponseEntity<DeskteriorPostDto> createPost(@RequestBody DeskteriorPostRequest request) {
        DeskteriorPostDto createdPost = deskteriorPostService.save(request.getDeskteriorPostDto(), request.getDeskteriorImageDto());
        return ResponseEntity.ok(createdPost);
    }

    // 4. 게시물 수정
    @PutMapping("/{id}")
    public ResponseEntity<DeskteriorPostDto> updatePost(@PathVariable Long id, @RequestBody DeskteriorPostRequest request) {
        DeskteriorPostDto updatedPost = deskteriorPostService.update(id, request.getDeskteriorPostDto(), request.getDeskteriorImageDto());
        return ResponseEntity.ok(updatedPost);
    }

    // 5. ID로 게시물 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        deskteriorPostService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // 6. 제목에 특정 키워드를 포함하는 게시물 조회
    @GetMapping("/search")
    public ResponseEntity<List<DeskteriorPostDto>> searchPosts(@RequestParam String keyword) {
        List<DeskteriorPostDto> posts = deskteriorPostService.findByTitleContaining(keyword);
        return ResponseEntity.ok(posts);
    }
}
