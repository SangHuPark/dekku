package dekku.spring_dekku.domain.product.controller;

import dekku.spring_dekku.domain.product.model.dto.request.CreateProductRequestDto;
import dekku.spring_dekku.domain.product.model.dto.response.CreatePostProductMatchResponseDto;
import dekku.spring_dekku.domain.product.model.dto.response.CreateProductResponseDto;
import dekku.spring_dekku.domain.product.model.entity.code.Category;
import dekku.spring_dekku.domain.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "제품 관련 API")
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @Operation(summary = "새로운 제품 저장")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "제품 저장 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터로 인한 실패")
    })
    @PostMapping("/save")
    public ResponseEntity<CreateProductResponseDto> saveProduct(@Valid @RequestBody CreateProductRequestDto requestDto) {
        CreateProductResponseDto responseDto = productService.saveProduct(requestDto);
        return ResponseEntity.status(201).body(responseDto);
    }

    @Operation(summary = "모든 제품 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "제품 조회 성공"),
            @ApiResponse(responseCode = "204", description = "제품이 없습니다.")
    })
    @GetMapping
    public ResponseEntity<List<CreateProductResponseDto>> getAllProducts() {
        List<CreateProductResponseDto> products = productService.findAllProductDtos();
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
        List<CreateProductResponseDto> products = productService.getProductsByCategory(category);
        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

    @Operation(summary = "게시물의 제품들과 연관된 데스크테리어 게시물 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "연관된 게시물 조회 성공"),
            @ApiResponse(responseCode = "404", description = "해당 게시물을 찾을 수 없습니다.")
    })
    @GetMapping("/deskterior-posts-by-products")
    public ResponseEntity<List<CreatePostProductMatchResponseDto>> getDeskteriorPostByProducts(@RequestParam Long postId) {
        List<CreatePostProductMatchResponseDto> postProductMatches = productService.findDeskteriorPostByProducts(postId);
        if (postProductMatches.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(postProductMatches);
    }
}
