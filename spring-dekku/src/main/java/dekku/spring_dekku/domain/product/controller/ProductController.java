package dekku.spring_dekku.domain.product.controller;

import dekku.spring_dekku.domain.product.model.dto.request.CreateProductRequestDto;
import dekku.spring_dekku.domain.product.model.dto.response.CreateProductResponseDto;
import dekku.spring_dekku.domain.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}


