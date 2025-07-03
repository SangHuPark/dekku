package com.a306.dekku.domain.board.service;

import com.a306.dekku.domain.board.model.dto.SimpleBoardDto;
import com.a306.dekku.domain.board.model.dto.request.CreateBoardRequest;

public interface BoardService {

    Long create(CreateBoardRequest request);

    SimpleBoardDto getBoardV1(Long boardId);

    SimpleBoardDto getBoardV2(Long boardId);

    SimpleBoardDto getBoardV3(Long boardId);

    long increaseViewCount(Long boardId);

    long increaseViewCountV3(Long boardId);
}
