package com.a306.dekku.domain.product.model.dto;

import com.a306.dekku.domain.product.model.entity.enums.ProductType;

public record CreateProductRequest(
        String name,
        String price,
        String thumbnailImageUrl,
        String description,
        ProductType category
) {}

