package com.a306.dekku.domain.board.service;

import com.a306.dekku.domain.board.model.dto.request.CreateBoardRequest;
import com.a306.dekku.domain.board.model.entity.Board;
import com.a306.dekku.domain.board.model.entity.BoardProduct;
import com.a306.dekku.domain.board.repository.BoardRepository;
import com.a306.dekku.domain.product.model.entity.Product;
import com.a306.dekku.domain.product.repository.ProductRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public Long create(CreateBoardRequest request) {
        Board board = Board.builder()
                .title(request.title())
                .content(request.content())
                .build();

        // 연관된 제품들 가져와서 BoardProduct로 매핑
        List<Product> products = productRepository.findAllById(request.productIds());
        products.forEach(product -> board.addBoardProduct(BoardProduct.of(board, product)));

        return boardRepository.save(board).getId();
    }

}
