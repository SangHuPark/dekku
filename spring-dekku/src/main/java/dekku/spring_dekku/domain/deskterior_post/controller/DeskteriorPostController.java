package dekku.spring_dekku.domain.deskterior_post.controller;

import dekku.spring_dekku.domain.deskterior_post.model.dto.request.CreateDeskteriorPostRequestDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.CreateDeskteriorPostResponseDto;
import dekku.spring_dekku.global.model.dto.Success;
import dekku.spring_dekku.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "데스크테리어 게시판 관련 API")
@RestController
@RequestMapping(name = "/api/deskterior-post")
public class DeskteriorPostController {

    @Operation(summary = "게시글 저장")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 저장 성공",
                    content = @Content(schema = @Schema(implementation = CreateDeskteriorPostResponseDto.class))
            )
    })
    @PostMapping("")
    public ResponseEntity createDeskteriorPost(@RequestBody @Valid CreateDeskteriorPostRequestDto request) {

        CreateDeskteriorPostResponseDto response = new CreateDeskteriorPostResponseDto(request.title(), request.content());

        return ResponseUtil.created(
                Success.builder()
                        .data(response)
                        .build()
        );
    }

}
