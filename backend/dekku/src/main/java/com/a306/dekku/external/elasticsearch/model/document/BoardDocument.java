package com.a306.dekku.external.elasticsearch.model.document;

import com.a306.dekku.domain.board.model.entity.Board;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.Setting;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
//@Setting(settingPath = "/elasticsearch/setting-ngram.json")
@Setting(settingPath = "/elasticsearch/setting-edge-ngram.json")
//@Mapping(mappingPath = "/elasticsearch/board-mapping-ngram.json")
@Mapping(mappingPath = "/elasticsearch/board-mapping-edge-ngram.json")
@Document(indexName = "board-edge-ngram")
public class BoardDocument {

    @Id
    private UUID id;

    private String title;

    private String content;

    private List<String> productNames;

    public static BoardDocument of(Board board) {
        return BoardDocument.builder()
                .id(UUID.randomUUID())
                .title(board.getTitle())
                .content(board.getContent())
                .productNames(board.getBoardProducts().stream()
                        .map(bp -> bp.getProduct().getName())
                        .collect(Collectors.toList()))
                .build();
    }
}
