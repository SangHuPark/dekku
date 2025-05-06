package dekku.spring_dekku.domain.deskterior_post.model.dto.response;

import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.Color;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.Job;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.Style;
import dekku.spring_dekku.domain.deskterior_post.model.entity.code.OpenStatus;

import java.util.List;

public record UpdateDeskteriorPostRequestDto(
        String title,
        String content,
        Style style,
        Color color,
        Job job,
        List<String> deskteriorPostImages,
        List<Long> productIds,
        OpenStatus openStatus

        ) {}
