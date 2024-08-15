package dekku.spring_dekku.domain.product.controller;

import dekku.spring_dekku.domain.deskterior_post.model.dto.response.FindDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.product.model.dto.request.CreateProductRequestDto;
import dekku.spring_dekku.domain.product.model.dto.response.CreatePostProductMatchResponseDto;
import dekku.spring_dekku.domain.product.model.dto.response.CreateProductResponseDto;
import dekku.spring_dekku.domain.product.model.dto.response.FindProductResponseDto;
import dekku.spring_dekku.domain.product.model.entity.code.Category;
import dekku.spring_dekku.domain.product.service.ProductServiceimpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "제품 관련 API")
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductServiceimpl productServiceimpl;

    @Operation(summary = "새로운 제품 저장")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "제품 저장 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터로 인한 실패")
    })
    @PostMapping("/save")
    public ResponseEntity<CreateProductResponseDto> saveProduct(@Valid @RequestBody CreateProductRequestDto requestDto) {
        CreateProductResponseDto responseDto = productServiceimpl.saveProduct(requestDto);
        return ResponseEntity.status(201).body(responseDto);
    }

    @Operation(summary = "모든 제품 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "제품 조회 성공"),
            @ApiResponse(responseCode = "204", description = "제품이 없습니다.")
    })
    @GetMapping
    public ResponseEntity<List<CreateProductResponseDto>> getAllProducts() {
        List<CreateProductResponseDto> products = productServiceimpl.findAllProducts();
        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

    @Operation(summary = "카테고리별 제품 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "카테고리별 제품 조회 성공"),
            @ApiResponse(responseCode = "204", description = "해당 카테고리 제품이 없습니다.")
    })
    @GetMapping("/category")
    public ResponseEntity<List<CreateProductResponseDto>> getProductsByCategory(@RequestParam Category category) {
        List<CreateProductResponseDto> products = productServiceimpl.getProductsByCategory(category);
        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

    @Operation(summary = "게시물 내에서 제품들과 연관된 데스크테리어 게시물 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "연관된 게시물 조회 성공"),
            @ApiResponse(responseCode = "404", description = "해당 게시물을 찾을 수 없습니다.")
    })
    @GetMapping("/deskterior-posts-by-details")
    public ResponseEntity<List<CreatePostProductMatchResponseDto>> getDeskteriorPostByDetails(@RequestParam Long postId) {
        List<CreatePostProductMatchResponseDto> postProductMatches = productServiceimpl.findDeskteriorPostByDetails(postId);
        if (postProductMatches.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(postProductMatches);
    }

    @Operation(summary = "키워드로 제품 이름 검색")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "검색된 제품 이름 조회 성공"),
            @ApiResponse(responseCode = "204", description = "해당 키워드를 포함한 제품이 없습니다.")
    })
    @GetMapping("/search/names")
    public ResponseEntity<List<FindProductResponseDto>> searchProductNames(@RequestParam("keyword") String keyword) {
        List<FindProductResponseDto> productNames = productServiceimpl.searchProductNamesByKeyword(keyword);

        if (productNames.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(productNames);
    }

    @Operation(summary = "제품 이름을 클릭해 관련 게시물 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "해당 제품 이름이 포함된 게시물 조회 성공"),
            @ApiResponse(responseCode = "204", description = "해당 제품 이름이 포함된 게시물이 없습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청: 제품 이름이 비어 있음"),
            @ApiResponse(responseCode = "500", description = "서버 오류 발생")
    })
    @GetMapping("/search/posts")
    public ResponseEntity<List<FindDeskteriorPostResponseDto>> getPostsByProductName(@RequestParam String productName) {
        // 제품 이름이 비어있는 경우 잘못된 요청 처리
        if (productName == null || productName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null); // 400 Bad Request 응답
        }

        List<FindDeskteriorPostResponseDto> posts;
        try {
            // 서비스 호출하여 게시물 목록 조회
            posts = productServiceimpl.findPostsByProductName(productName);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 500 응답
        }

        // 게시물이 없는 경우 204 No Content 응답
        if (posts.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content 응답
        }

        // 게시물이 있는 경우 200 OK 응답
        return ResponseEntity.ok(posts); // 200 OK 응답
    }
}