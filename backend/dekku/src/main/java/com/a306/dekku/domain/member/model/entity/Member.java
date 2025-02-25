package com.a306.dekku.domain.member.model.entity;

import com.a306.dekku.domain.member.model.entity.enums.GenderType;
import com.a306.dekku.domain.member.model.entity.enums.ProviderType;
import com.a306.dekku.global.model.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

@Table(name = "members")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Setter
    private String nickname;

    @Setter
    private String introduction;

    @Setter
    private String profileImageUrl;

    @Setter
    private GenderType gender;

    @Setter
    private LocalDate birth;

    @Setter
    private Integer ageRange;

    @Embedded
    private OAuth2Details oAuth2Details;

    @Builder
    public Member(
            String nickname, String introduction, GenderType gender, LocalDate birth, ProviderType provider, String providerId
    ) {
        this.nickname = nickname;
        this.introduction = introduction;
        this.gender = gender;
        this.birth = birth;
        this.ageRange = calculateAgeRange();
        this.oAuth2Details = OAuth2Details.of(provider, providerId);
    }

    private int calculateAgeRange() {
        // 예외 처리
        if (this.birth == null) {
            return 0;
        }

        int age = Period.between(this.birth, LocalDate.now()).getYears();
        return (age / 10) * 10; // 예: 25살 -> 20, 31살 -> 30
    }

}
