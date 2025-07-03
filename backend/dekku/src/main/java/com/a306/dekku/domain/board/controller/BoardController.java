package com.a306.dekku.domain.board.controller;

import com.a306.dekku.domain.board.model.dto.SimpleBoardDto;
import com.a306.dekku.domain.board.model.dto.request.CreateBoardRequest;
import com.a306.dekku.domain.board.service.BoardService;
import com.a306.dekku.global.model.dto.Result;
import com.a306.dekku.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/boards")
@RequiredArgsConstructor
@Tag(name = "게시글 API", description = "게시글 API입니다.")
public class BoardController {

    private final BoardService boardService;

    @Operation(summary = "게시글 등록", description = "새로운 게시글을 등록합니다.")
    @PostMapping
    public ResponseEntity<Result<Long>> createBoard(@RequestBody CreateBoardRequest request) {
        Long boardId = boardService.create(request);
        return ResponseUtil.ok(Result.of(boardId));
    }

}
