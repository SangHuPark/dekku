package dekku.spring_dekku.domain.deskterior_post.model.entity;

import dekku.spring_dekku.domain.deskterior_post.model.type.Color;
import dekku.spring_dekku.domain.deskterior_post.model.type.Style;
import dekku.spring_dekku.domain.deskterior_post.model.type.Job;
import jakarta.persistence.*;
import lombok.Getter;

@Embeddable
@Getter
@Access(AccessType.FIELD)
public class DeskteriorAttributes {

    @Enumerated(EnumType.STRING)
    @Column(name = "style", length = 20)
    private Style style;

    @Enumerated(EnumType.STRING)
    @Column(name = "color", length = 20)
    private Color color;

    @Enumerated(EnumType.STRING)
    @Column(name = "job", length = 20)
    private Job job;

    // 기본 생성자
    public DeskteriorAttributes() {}

    // 생성자
    public DeskteriorAttributes(Style style, Color color, Job job) {
        this.style = style;
        this.color = color;
        this.job = job;
    }
}
