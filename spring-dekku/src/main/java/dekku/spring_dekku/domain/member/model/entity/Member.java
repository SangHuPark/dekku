package dekku.spring_dekku.domain.member.model.entity;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.member.model.entity.code.AgeRange;
import dekku.spring_dekku.domain.member.model.entity.code.Gender;
import dekku.spring_dekku.domain.member.model.entity.code.MemberRole;
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

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false, unique = true)
	private String nickname;

	private String image_url;

	private String deleted_at;

    @Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private MemberRole role;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Gender gender;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private AgeRange ageRange;

	@OneToMany(mappedBy = "member")
	/**
	 * 컬렉션은 필드에서 초기화 하자.
	 * 1. null 문제에서 안전하다
	 * 2. hibernate는 엔티티 영속화 시 컬렉션을 감싸 hibernate 가 제공하는 내장 컬렉션으로 변경한다.
	 *      만약 임의의 메서드에서 컬렉션을 잘못 생성하면 hibernate 내부 메커니즘에 문제가 발생할 수 있다.
	 */
	private List<DeskteriorPost> deskteriorPosts = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<Like> likes = new ArrayList<>();

	@OneToMany(mappedBy = "fromMember")
	private List<Follow> followings = new ArrayList<>();

	@OneToMany(mappedBy = "toMember", fetch = FetchType.LAZY)
	private List<Follow> followers = new ArrayList<>();

    @Builder
	public Member(String email, String password, String name, String nickname, String image_url, Gender gender, AgeRange ageRange) {
		this.email = email;
		this.password = password;
		this.name = name;
		this.nickname = nickname;
		this.gender = gender;
		this.ageRange = ageRange;

		// service 에서 처리
		this.image_url = image_url;
		this.role = MemberRole.COMMON;
	}

	public void updateDeletedAt(String deleted_at) {
		this.deleted_at = deleted_at;
	}

}

