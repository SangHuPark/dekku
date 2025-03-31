package com.a306.dekku.domain.board.service;

import com.a306.dekku.domain.board.model.dto.SimpleBoardDto;

import java.util.List;

public interface BoardQueryService {

    List<SimpleBoardDto> searchBoardsByKeyword(String keyword);

}
