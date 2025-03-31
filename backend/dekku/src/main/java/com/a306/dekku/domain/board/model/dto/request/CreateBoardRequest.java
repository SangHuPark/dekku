package com.a306.dekku.domain.board.model.dto.request;

import java.util.List;

public record CreateBoardRequest(
        String title,
        String content,
        List<Long> productIds
) {

}
