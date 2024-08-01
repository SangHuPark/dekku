package dekku.spring_dekku.domain.deskterior_post.model.entity;

import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.DeskteriorAttributes;
import dekku.spring_dekku.domain.deskterior_post.model.entity.code.OpenStatus;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.model.entity.Like;
import dekku.spring_dekku.domain.product.model.entity.DeskteriorPostProductInfo;
import dekku.spring_dekku.global.model.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "deskterior_posts")
@Getter
public class DeskteriorPost extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deskterior_post_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "deskteriorPost")
    private List<DeskteriorPostImage> deskteriorPostImages = new ArrayList<>();

    @OneToMany(mappedBy = "deskteriorPost")
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "deskteriorPost")
    private List<DeskteriorPostProductInfo> deskteriorPostProductInfos = new ArrayList<>();

    private String title;

    private String content;

    private String thumbnailUrl;

    private int viewCount;

    private int likeCount;

    @Enumerated(EnumType.STRING)
    private OpenStatus openStatus;

    @Embedded
    private DeskteriorAttributes deskteriorAttributes;

    @Builder
    public DeskteriorPost(Member member, String title, String content, DeskteriorAttributes deskteriorAttributes, List<DeskteriorPostProductInfo> deskteriorPostProductInfos, OpenStatus openStatus) {

        this.member = member;
        this.title = title;
        this.content = content;
        this.deskteriorAttributes = deskteriorAttributes;
        this.thumbnailUrl = deskteriorPostImages.get(0).getImageUrl();
        this.deskteriorPostProductInfos = deskteriorPostProductInfos;
        this.openStatus = openStatus;

        this.viewCount = 0;
        this.likeCount = 0;
    }
}
