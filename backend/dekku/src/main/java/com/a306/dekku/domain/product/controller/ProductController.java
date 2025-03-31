package com.a306.dekku.domain.product.controller;

import com.a306.dekku.domain.product.model.dto.CreateProductRequest;
import com.a306.dekku.domain.product.service.ProductService;
import com.a306.dekku.global.model.dto.Result;
import com.a306.dekku.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "제품 API")
@RestController
@RequestMapping("/v1/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @Operation(summary = "제품 등록", description = "신규 제품을 등록합니다.")
    @PostMapping
    public ResponseEntity<Result<Long>> createProduct(@RequestBody CreateProductRequest request) {
        Long productId = productService.create(request);
        return ResponseUtil.ok(Result.of(productId));
    }
}
