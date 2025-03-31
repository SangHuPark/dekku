package com.a306.dekku.domain.board.service;

import com.a306.dekku.domain.board.model.dto.SimpleBoardDto;
import com.a306.dekku.domain.board.model.dto.request.CreateBoardRequest;

import java.util.List;

public interface BoardService {

    Long create(CreateBoardRequest request);

}
