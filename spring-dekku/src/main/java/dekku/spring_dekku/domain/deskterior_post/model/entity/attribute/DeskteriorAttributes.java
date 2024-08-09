package dekku.spring_dekku.domain.deskterior_post.model.entity.attribute;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DeskteriorAttributes {

    @Enumerated(EnumType.STRING)
    @Column(name = "style", length = 20)
    public Style style;

    @Enumerated(EnumType.STRING)
    @Column(name = "color", length = 20)
    public Color color;

    @Enumerated(EnumType.STRING)
    @Column(name = "job", length = 20)
    public Job job;

    @Builder
    public DeskteriorAttributes(Style style, Color color, Job job) {
        this.style = style;
        this.color = color;
        this.job = job;
    }

}
