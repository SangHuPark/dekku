package dekku.spring_dekku.domain.deskterior_post.model.dto;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorAttributes;
import dekku.spring_dekku.domain.deskterior_post.model.type.Status;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Builder
public class DeskteriorPostDto {
    private String title;
    private String thumbnailUrl;
    private String content;
    private Timestamp createdAt;
    private Timestamp modifiedAt;
    private Long deskteriorImageId;
    private Long userId;
    private DeskteriorAttributes deskteriorAttributes;
    private int viewCount;
    private int likeCount;
    private Status status;
}