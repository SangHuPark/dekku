package com.a306.dekku.domain.board.controller;

import com.a306.dekku.domain.board.model.dto.SimpleBoardDto;
import com.a306.dekku.domain.board.service.BoardService;
import com.a306.dekku.global.model.dto.Result;
import com.a306.dekku.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "게시글 API", description = "게시글 API입니다.")
public class BoardViewController {

    private final BoardService boardService;

    @Operation(summary = "게시글 조회 v1", description = "게시글을 조회하고 조회수를 1 증가시킵니다.")
    @GetMapping("/v1/boards/{boardId}")
    public ResponseEntity<Result<SimpleBoardDto>> getBoardV1(@PathVariable Long boardId) {
        SimpleBoardDto dto = boardService.getBoardV1(boardId);
        return ResponseUtil.ok(Result.of(dto));
    }

    @Operation(summary = "게시글 조회 v2", description = "게시글을 조회하고 조회수를 1 증가시킵니다.")
    @GetMapping("/v2/boards/{boardId}")
    public ResponseEntity<Result<SimpleBoardDto>> getBoardV2(@PathVariable Long boardId) {
        SimpleBoardDto dto = boardService.getBoardV2(boardId);
        return ResponseUtil.ok(Result.of(dto));
    }

    @Operation(summary = "게시글 조회 v3", description = "게시글을 조회하고 조회수를 1 증가시킵니다.")
    @GetMapping("/v3/boards/{boardId}")
    public ResponseEntity<Result<SimpleBoardDto>> getBoardV3(@PathVariable Long boardId) {
        SimpleBoardDto dto = boardService.getBoardV3(boardId);
        return ResponseUtil.ok(Result.of(dto));
    }

}
