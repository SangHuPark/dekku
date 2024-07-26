package dekku.spring_dekku.domain.dekku.model.entity;

import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.global.model.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "dekku_3d_files")
public class ThreeDFile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member memberId;

    @Column(columnDefinition = "TEXT")
    private String threeDFileUrl;

    @Column(columnDefinition = "TEXT")
    private String thumbnailUrl;
}
