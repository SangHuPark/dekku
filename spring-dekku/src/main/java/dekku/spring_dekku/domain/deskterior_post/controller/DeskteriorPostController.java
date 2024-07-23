package dekku.spring_dekku.domain.deskterior_post.controller;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.service.DeskteriorPostService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/deskterior-posts")
@Tag(name = "DeskteriorPost APIS")
@RequiredArgsConstructor
public class DeskteriorPostController {

    private final DeskteriorPostService service;

    @GetMapping
    public List<DeskteriorPost> getAllPosts() {
        return service.findAll();
    }

    @GetMapping("/{postId}")
    public ResponseEntity<DeskteriorPost> getPostById(@PathVariable Long postId) {
        Optional<DeskteriorPost> post = service.findById(postId);
        if (post.isPresent()) {
            return ResponseEntity.ok(post.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public DeskteriorPost createPost(@RequestBody DeskteriorPost post) {
        DeskteriorPost newPost = DeskteriorPost.builder()
                .title(post.getTitle())
                .thumbnailUrl(post.getThumbnailUrl())
                .content(post.getContent())
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .modifiedAt(new Timestamp(System.currentTimeMillis()))
                .deskteriorImageId(post.getDeskteriorImageId())
                .userId(post.getUserId())
                .build();
        return service.save(newPost);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<DeskteriorPost> updatePost(@PathVariable Long postId, @RequestBody DeskteriorPost postDetails) {
        Optional<DeskteriorPost> post = service.findById(postId);
        if (post.isPresent()) {
            DeskteriorPost updatedPost = DeskteriorPost.builder()
                    .id(postId)
                    .title(postDetails.getTitle())
                    .thumbnailUrl(postDetails.getThumbnailUrl())
                    .content(postDetails.getContent())
                    .createdAt(postDetails.getCreatedAt())
                    .modifiedAt(new Timestamp(System.currentTimeMillis()))
                    .deskteriorImageId(postDetails.getDeskteriorImageId())
                    .userId(postDetails.getUserId())
                    .build();
            return ResponseEntity.ok(service.save(updatedPost));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        service.deleteById(postId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<DeskteriorPost> searchPostsByTitle(@RequestParam String keyword) {
        return service.findPostsByTitleContaining(keyword);
    }
}
