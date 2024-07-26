package dekku.spring_dekku.domain.member.model.entity;

import dekku.spring_dekku.global.model.entity.BaseEntity;
import lombok.*;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long user_id;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false, unique = true)
	private String nickname;

	@Column(nullable = false, unique = true)
	private String phoneNumber;

	private String image_url;

	private String deleted_at;

	@Setter
    @Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private MemberRole memberRole;

    @Builder
	public Member(String email, String password, String name, String nickname, String phoneNumber, String image_url, String deleted_at) {
		this.email = email;
		this.password = password;
		this.name = name;
		this.nickname = nickname;
		this.phoneNumber = phoneNumber;

		// service 에서 처리
		this.image_url = image_url;
		this.memberRole = MemberRole.COMMON;
	}

}

