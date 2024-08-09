package dekku.spring_dekku.domain.like.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.member.model.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "members_liked_posts_info")
@Getter
@RequiredArgsConstructor
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonManagedReference
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deskterior_post_id")
    @JsonManagedReference
    private DeskteriorPost deskteriorPost;

    public Like(Member member, DeskteriorPost post) {
        this.member = member;
        this.deskteriorPost = post;
        member.getLikes().add(this);
        post.getLikes().add(this);
    }
}
