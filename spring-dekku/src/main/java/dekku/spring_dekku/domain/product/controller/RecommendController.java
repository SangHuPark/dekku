package dekku.spring_dekku.domain.product.controller;

import dekku.spring_dekku.domain.deskterior_post.service.DeskteriorPostService;
import dekku.spring_dekku.domain.product.model.dto.request.RecommendRequestDto;
import dekku.spring_dekku.domain.product.model.dto.response.CreatePostProductMatchResponseDto;
import dekku.spring_dekku.domain.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "제품 추천 API")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RecommendController {

    private final ProductService productService;

    @Operation(summary = "게시물의 제품들과 연관된 데스크테리어 게시물 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "연관된 게시물 조회 성공"),
            @ApiResponse(responseCode = "404", description = "해당 게시물을 찾을 수 없습니다.")
    })
    @PostMapping("/recommend")
    public ResponseEntity<List<CreatePostProductMatchResponseDto>> recommendPosts(@RequestBody RecommendRequestDto requestDto) {
        List<CreatePostProductMatchResponseDto> recommendedPosts = productService.findDeskteriorPostsByProductIds(requestDto);

        if (recommendedPosts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(recommendedPosts);
    }
}