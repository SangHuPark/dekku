package com.a306.dekku.domain.board.service;

import com.a306.dekku.domain.board.exception.NotExistBoardException;
import com.a306.dekku.domain.board.model.dto.SimpleBoardDto;
import com.a306.dekku.domain.board.model.dto.request.CreateBoardRequest;
import com.a306.dekku.domain.board.model.entity.Board;
import com.a306.dekku.domain.board.model.entity.BoardProduct;
import com.a306.dekku.domain.board.repository.BoardRepository;
import com.a306.dekku.domain.product.model.entity.Product;
import com.a306.dekku.domain.product.repository.ProductRepository;
import com.a306.dekku.external.redis.service.lock.RedissonLockService;
import com.a306.dekku.external.redis.service.viewCounter.RedisViewCounter;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.a306.dekku.global.constant.StringFormat.REDIS_LOCK_PREFIX;
import static com.a306.dekku.global.constant.StringFormat.REDIS_VIEW_KEY_PREFIX;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final RedissonLockService redissonLockService;
    private final RedisViewCounter redisViewCounter;
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

    @Override
    @Transactional
    public SimpleBoardDto getBoardV1(Long boardId) {
        // 조회수 DB 직접 증가
        Board board = boardRepository.getOrThrow(boardId);
        board.increaseViewCount(); // Entity 내부에서 +1

        return SimpleBoardDto.of(board, board.getViewCount());
    }

    @Override
    @Transactional(readOnly = true)
    public SimpleBoardDto getBoardV2(Long boardId) {
        long viewCount = increaseViewCount(boardId);

        Board board = boardRepository.getOrThrow(boardId);

        return SimpleBoardDto.of(board, viewCount);
    }

    @Override
    public SimpleBoardDto getBoardV3(Long boardId) {
        long updatedViewCount = increaseViewCountV3(boardId);
        Board board = boardRepository.getOrThrow(boardId);

        return SimpleBoardDto.of(board, updatedViewCount);
    }

    @Override
    public long increaseViewCount(Long boardId) {
        String key = REDIS_VIEW_KEY_PREFIX + boardId;
        String lockKey = REDIS_LOCK_PREFIX + boardId;

        return redissonLockService.executeWithLock(lockKey, () -> {
            long currentViewCount = redisViewCounter.get(key)
                    .map(Long::parseLong)
                    .orElseGet(() -> boardRepository.findViewCountById(boardId)
                            .orElseThrow(NotExistBoardException::new));

            long updatedViewCount = currentViewCount + 1;
            redisViewCounter.set(key, String.valueOf(updatedViewCount));
            return updatedViewCount;
        });

    }

    @Override
    public long increaseViewCountV3(Long boardId) {
        return redisViewCounter.increment("board:viewCount:", boardId, 1L);
    }

}
