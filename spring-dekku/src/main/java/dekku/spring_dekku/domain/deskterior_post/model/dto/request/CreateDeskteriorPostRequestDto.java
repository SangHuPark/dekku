package dekku.spring_dekku.domain.deskterior_post.model.dto.request;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.Color;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.DeskteriorAttributes;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.Job;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.Style;
import dekku.spring_dekku.domain.deskterior_post.model.entity.code.OpenStatus;
import dekku.spring_dekku.domain.member.model.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
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

        @JsonSerialize(using = ToStringSerializer.class)
        List<Long> productIds,

        OpenStatus openStatus
) {

        @Builder
        public static DeskteriorPost toEntity(Member member, String title, String content, DeskteriorAttributes deskteriorAttributes, OpenStatus openStatus) {
                return DeskteriorPost.builder()
                        .member(member)
                        .title(title)
                        .content(content)
                        .deskteriorAttributes(deskteriorAttributes)
                        .openStatus(openStatus)
                        .build();
        }

        @Builder
        public static DeskteriorAttributes createDeskteriorAttributes(Style style, Color color, Job job) {
                return DeskteriorAttributes.builder()
                        .style(style)
                        .color(color)
                        .job(job)
                        .build();
        }

}
