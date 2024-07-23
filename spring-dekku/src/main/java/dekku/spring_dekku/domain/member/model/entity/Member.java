package dekku.spring_dekku.domain.member.model.entity;

import lombok.*;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
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

	private String phone;

	private String image_url;

	private Timestamp created_at;

	private Timestamp deleted_at;

	private String token;

	public void setToken(String token) {
		this.token = token;
	}


	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private MemberRole memberRole;

	@Builder
	public Member(Long user_id, String email, String password, String name, String nickname, String phone, Timestamp created_at) {
		this.user_id = user_id;
		this.email = email;
		this.password = password;
		this.name = name;
		this.nickname = nickname;
		this.phone = phone;
		this.created_at = created_at;
		this.memberRole = MemberRole.COMMON;
	}

}

