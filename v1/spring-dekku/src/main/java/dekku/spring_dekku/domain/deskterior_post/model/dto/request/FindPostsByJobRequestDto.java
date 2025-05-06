package dekku.spring_dekku.domain.deskterior_post.model.dto.request;

import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.Job;

public record FindPostsByJobRequestDto(

        Job job

) {
}
