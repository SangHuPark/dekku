package com.a306.dekku.domain.product.service;

import com.a306.dekku.domain.product.model.dto.CreateProductRequest;

public interface ProductService {
    Long create(CreateProductRequest request);
}
