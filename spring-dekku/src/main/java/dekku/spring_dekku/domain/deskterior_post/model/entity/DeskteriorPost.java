package dekku.spring_dekku.domain.deskterior_post.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.DeskteriorAttributes;
import dekku.spring_dekku.domain.deskterior_post.model.entity.code.OpenStatus;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.like.model.entity.Like;
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
    @JsonManagedReference
    private Member member;

    private String thumbnailUrl;

    @OneToMany(mappedBy = "deskteriorPost", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<DeskteriorPostImage> deskteriorPostImages = new ArrayList<>();

    @OneToMany(mappedBy = "deskteriorPost", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "deskteriorPost", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<DeskteriorPostProductInfo> deskteriorPostProductInfos = new ArrayList<>();

    public String title;

    public String content;

    private int viewCount;

    private int likeCount;

    private int commentCount;

    @Enumerated(EnumType.STRING)
    public OpenStatus openStatus;

    @Embedded
    private DeskteriorAttributes deskteriorAttributes;

    @Builder
    public DeskteriorPost(Member member, String title, String content, DeskteriorAttributes deskteriorAttributes, OpenStatus openStatus, int viewCount) {

        this.member = member;
        this.title = title;
        this.content = content;
        this.deskteriorAttributes = deskteriorAttributes;
        this.openStatus = openStatus;

        this.viewCount = viewCount;
        this.likeCount = 0;
        this.commentCount = 0; // 댓글 개수를 초기화
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

    public void increase(int viewCount) {
        this.viewCount += viewCount;
    }

    public void increaseCommentCount() { this.commentCount++; }

    public void decreaseCommentCount() {if (this.commentCount > 0) { this.commentCount--; }}

    public void insertThumnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }
}