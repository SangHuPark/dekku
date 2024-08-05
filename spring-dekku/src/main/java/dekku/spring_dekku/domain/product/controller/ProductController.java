package dekku.spring_dekku.domain.product.controller;

import dekku.spring_dekku.domain.product.model.dto.request.CreateProductRequestDto;
import dekku.spring_dekku.domain.product.model.dto.response.CreateProductResponseDto;
import dekku.spring_dekku.domain.product.model.entity.Product;
import dekku.spring_dekku.domain.product.model.entity.code.Category;
import dekku.spring_dekku.domain.product.service.ProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="제품 관련 API")
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/save")
    public ResponseEntity<CreateProductResponseDto> saveProduct(@Valid @RequestBody CreateProductRequestDto requestDto) {
        CreateProductResponseDto responseDto = productService.saveProduct(requestDto);
        return ResponseEntity.status(201).body(responseDto);
    }

    @GetMapping
    public ResponseEntity<List<CreateProductResponseDto>> getAllProducts() {
        List<CreateProductResponseDto> products = productService.findAllProductDtos();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/category")
    public ResponseEntity<List<CreateProductResponseDto>> getProductsByCategory(@RequestParam Category category) {
        List<CreateProductResponseDto> products = productService.getProductsByCategory(category);
        return ResponseEntity.ok(products);
    }

}


