package dekku.spring_dekku.domain.member.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.follow.model.entity.Follow;
import dekku.spring_dekku.domain.like.model.entity.Like;
import dekku.spring_dekku.global.model.entity.BaseEntity;
import lombok.*;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Table(name = "members")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private Long id;

	@Column(nullable = false)
	private String username; // provider + provider id

	@Column(nullable = false)
	private String email;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false, unique = true)
	private String nickname;

	@Column
	private String introduction;

	@Column(name = "image_url")
	private String imageUrl;

    @Column(nullable = false)
	private String role;

	@Column(nullable = false)
	private String gender;

	@Column(nullable = false)
	private Integer ageRange;

	@OneToMany(mappedBy = "member")
	@JsonBackReference
	/**
	 * 컬렉션은 필드에서 초기화 하자.
	 * 1. null 문제에서 안전하다
	 * 2. hibernate는 엔티티 영속화 시 컬렉션을 감싸 hibernate 가 제공하는 내장 컬렉션으로 변경한다.
	 *      만약 임의의 메서드에서 컬렉션을 잘못 생성하면 hibernate 내부 메커니즘에 문제가 발생할 수 있다.
	 */
	private List<DeskteriorPost> deskteriorPosts = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	@JsonBackReference
	private List<Like> likes = new ArrayList<>();

	@OneToMany(mappedBy = "fromMember")
	private List<Follow> followings = new ArrayList<>();

	@OneToMany(mappedBy = "toMember", fetch = FetchType.LAZY)
	private List<Follow> followers = new ArrayList<>();

    @Builder
	public Member(String username, String name, String email, String imageUrl, String role, String introduction) {
		this.username = username;
		this.email = email;
		this.name = name;
		this.nickname = this.name;
		this.gender = "";
		this.ageRange = 20;
		this.imageUrl = imageUrl;
		this.role = role;
		this.introduction = "";
	}

}

