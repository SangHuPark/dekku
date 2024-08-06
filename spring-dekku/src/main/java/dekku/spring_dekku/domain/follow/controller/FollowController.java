package dekku.spring_dekku.domain.follow.controller;

import dekku.spring_dekku.domain.follow.model.dto.FollowerDto;
import dekku.spring_dekku.domain.follow.model.dto.FollowingDto;
import dekku.spring_dekku.domain.follow.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @GetMapping("/followers")
    public ResponseEntity allFollowers(@RequestHeader(value="Access") String token) {
        List<FollowerDto> allFollowers = followService.getAllFollowers(token);
        if(allFollowers.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No followers");
        }
        return ResponseEntity.status(HttpStatus.OK).body(allFollowers);
    }

    @GetMapping("/followings")
    public ResponseEntity allFollowerings(@RequestHeader(value="Access") String token) {
        List<FollowingDto> allFollowings = followService.getAllFollowings(token);
        if(allFollowings.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No followings");
        }
        return ResponseEntity.status(HttpStatus.OK).body(allFollowings);
    }

    @PostMapping("/follow/{id}")
    public ResponseEntity<Boolean> toggleFollow(@RequestHeader(value="Access") String token, @PathVariable(name = "id") Long targetId) {
        boolean follow = followService.toggleFollow(token, targetId);
        if (follow) {
            return ResponseEntity.status(HttpStatus.OK).body(true);
//            return ResponseEntity.status(HttpStatus.OK).body("follow " + targetId);
        }
        return ResponseEntity.status(HttpStatus.OK).body(false);
//        return ResponseEntity.status(HttpStatus.OK).body("unfollow " + targetId);
    }
}
