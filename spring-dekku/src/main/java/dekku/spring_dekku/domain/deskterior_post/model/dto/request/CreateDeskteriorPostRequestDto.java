package dekku.spring_dekku.domain.deskterior_post.model.dto.request;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPostImage;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.Color;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.Job;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.Style;
import dekku.spring_dekku.domain.deskterior_post.model.entity.code.OpenStatus;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.product.model.entity.Product;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

import java.util.List;

@Schema(name = "데스크테리어 게시글 저장 요청 DTO")
public record CreateDeskteriorPostRequestDto(

        @NotBlank(message = "title 은 필수 데이터입니다.")
        String title,

        String content,

        Style style,

        Color color,

        Job job,

        @NotBlank
        List<String> deskteriorPostImages,

        List<Long> products,

        OpenStatus openStatus
) {

        @Builder
        public static DeskteriorPost toEntity(Member member, ) {
                return DeskteriorPost.builder()
                        .member(member)
                        .
                        .build();
        }
}
