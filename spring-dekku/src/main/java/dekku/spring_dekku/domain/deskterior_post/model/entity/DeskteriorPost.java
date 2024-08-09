package dekku.spring_dekku.domain.deskterior_post.model.entity;

import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.DeskteriorAttributes;
import dekku.spring_dekku.domain.deskterior_post.model.entity.code.OpenStatus;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.model.entity.Like;
import dekku.spring_dekku.domain.product.model.entity.DeskteriorPostProductInfo;
import dekku.spring_dekku.global.model.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

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

    private String thumnailUrl;

    @OneToMany(mappedBy = "deskteriorPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DeskteriorPostImage> deskteriorPostImages = new ArrayList<>();

    @OneToMany(mappedBy = "deskteriorPost")
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "deskteriorPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DeskteriorPostProductInfo> deskteriorPostProductInfos = new ArrayList<>();

    public String title;

    public String content;

    private int viewCount;

    private int likeCount;

    @Enumerated(EnumType.STRING)
    public OpenStatus openStatus;

    @Embedded
    private DeskteriorAttributes deskteriorAttributes;

    @Builder
    public DeskteriorPost(Member member, String title, String content, DeskteriorAttributes deskteriorAttributes, OpenStatus openStatus) {

        this.member = member;
        this.title = title;
        this.content = content;
        this.deskteriorAttributes = deskteriorAttributes;
        this.openStatus = openStatus;

        this.viewCount = 0;
        this.likeCount = 0;
    }

    public void insertDeskteriorPostImages(DeskteriorPostImage deskteriorPostImage) {
        this.deskteriorPostImages.add(deskteriorPostImage);

        if (deskteriorPostImage.getDeskteriorPost() != this) {
            deskteriorPostImage.setDeskteriorPost(this);
        }
    }

    public void insertDeskteriorPostProductInfos(DeskteriorPostProductInfo deskteriorPostProductInfo) {
        this.deskteriorPostProductInfos.add(deskteriorPostProductInfo);

        if (deskteriorPostProductInfo.getDeskteriorPost() != this) {
            deskteriorPostProductInfo.setDeskteriorPost(this);
        }
    }
}