package com.a306.dekku.external.elasticsearch.model.dto.response;

import com.a306.dekku.external.elasticsearch.model.document.BoardDocument;

import java.util.List;
import java.util.UUID;

public record GetBoardResponse(
        UUID id,
        String title,
        String content,
        List<String> productNames
) {
    public static GetBoardResponse fromDocument(BoardDocument doc) {
        return new GetBoardResponse(doc.getId(), doc.getTitle(), doc.getContent(), doc.getProductNames());
    }
}
