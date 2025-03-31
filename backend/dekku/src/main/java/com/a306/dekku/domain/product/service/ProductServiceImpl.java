package com.a306.dekku.domain.product.service;

import com.a306.dekku.domain.product.model.dto.CreateProductRequest;
import com.a306.dekku.domain.product.model.entity.Product;
import com.a306.dekku.domain.product.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    @Transactional
    public Long create(CreateProductRequest request) {
        Product product = Product.builder()
                .name(request.name())
                .price(request.price())
                .thumbnailImageUrl(request.thumbnailImageUrl())
                .description(request.description())
                .category(request.category())
                .build();

        return productRepository.save(product).getId();
    }

}
