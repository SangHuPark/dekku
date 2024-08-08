package dekku.spring_dekku.domain.deskterior_post.model.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.DeskteriorAttributes;
import dekku.spring_dekku.domain.deskterior_post.model.entity.code.OpenStatus;

public record FindDeskteriorPostResponseDto(

        @JsonSerialize(using = ToStringSerializer.class)
        Long postId,

        @JsonSerialize(using = ToStringSerializer.class)
        Long memberId,

        String memberNickName,
        String memberImage,
        String title,
        String content,
        String thumnail,
        int viewCount,
        int likeCount,
        OpenStatus openStatus,
        DeskteriorAttributes deskteriorAttributes

) {
        public FindDeskteriorPostResponseDto(DeskteriorPost deskteriorPost) {
                this(
                        deskteriorPost.getId(),
                        deskteriorPost.getMember().getId(),
                        deskteriorPost.getMember().getNickname(),
                        deskteriorPost.getMember().getImageUrl(),
                        deskteriorPost.getTitle(),
                        deskteriorPost.getContent(),
                        deskteriorPost.getThumnailUrl(),
                        deskteriorPost.getViewCount(),
                        deskteriorPost.getLikeCount(),
                        deskteriorPost.getOpenStatus(),
                        deskteriorPost.getDeskteriorAttributes()
                );
        }
}
