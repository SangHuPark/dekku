package dekku.spring_dekku.domain.like.controller;

import dekku.spring_dekku.domain.like.service.LikeService;
import dekku.spring_dekku.domain.member.exception.MemberNotFoundException;
import dekku.spring_dekku.global.exception.AccessTokenException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/likes")
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/{post_id}")
    public ResponseEntity likePost(@RequestHeader(name = "access") String token, @PathVariable(name = "post_id") Long postId) {
        try {
            likeService.likePost(postId, token);
        } catch (AccessTokenException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (MemberNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();

    }

}
