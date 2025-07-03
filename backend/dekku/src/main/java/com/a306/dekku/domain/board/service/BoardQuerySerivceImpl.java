package com.a306.dekku.domain.board.service;

import com.a306.dekku.domain.board.model.dto.SimpleBoardDto;
import com.a306.dekku.domain.board.model.entity.Board;
import com.a306.dekku.domain.board.repository.BoardRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardQuerySerivceImpl implements BoardQueryService {

    private final BoardRepository boardRepository;

    @Override
    @Transactional(readOnly = true)
    public List<SimpleBoardDto> searchBoardsByKeyword(String keyword) {
        List<Board> boards = boardRepository.findByTitleOrProductNameContaining(keyword);

        return boards.stream()
                .map(board -> SimpleBoardDto.of(board, board.getViewCount()))
                .toList();
    }

}
