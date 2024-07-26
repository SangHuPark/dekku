package dekku.spring_dekku.domain.dekku.controller;

import dekku.spring_dekku.domain.dekku.model.dto.request.CreateThreeDFileRequestDto;
import dekku.spring_dekku.domain.dekku.model.dto.response.CreateThreeDFileResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "3D 관련 APIS")
@RestController
@RequestMapping("/api/v1/dekku")
public class ThreeDFileController {

    @Operation(summary = "3D 저장")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "3D 저장 성공",
                    content = @Content(schema = @Schema(implementation = CreateThreeDFileResponseDto.class))
            )
    })
    @PostMapping("")
    public ResponseEntity<ProblemDetail> createThreeDFile(@RequestBody CreateThreeDFileRequestDto request) {

        return null;
    }
}
