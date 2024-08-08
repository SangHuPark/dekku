// app/pages/profile.js

import styles from '../styles/Profile.module.css';

const Profile = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.profile}>
          <div className={styles.profilePic}>
            <img src="/yuuka_tired.PNG" alt="Profile Picture" className={styles.profileImage} />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.profileHeader}>
              <h2>yuuka314</h2>
              <button className={styles.followButton}>팔로우</button>
            </div>
            <p>
              <strong>팔로워</strong> 1,950 | <strong>팔로잉</strong> 3
            </p>
            <p>Hayase Yuuka</p>
            <p>@Millenium</p>
          </div>
        </div>
        <div className={styles.tabs}>
          <button className={styles.tabButton}>게시물 99</button>
          <button className={styles.tabButton}>태그 상품 50</button>
        </div>
        <div className={styles.posts}>
          <div className={styles.post}>
            <img src="/shiroko_ddabong.png" alt="Post 1" />
            <div className={styles.postInfo}>
              <p>블루 아카이브</p>
              <span>5</span>
            </div>
          </div>
          <div className={styles.post}>
            <img src="/shiroko_ddabong.png" alt="Post 2" />
            <div className={styles.postInfo}>
              <p>정 말 로</p>
              <span>50</span>
            </div>
          </div>
          <div className={styles.post}>
            <img src="/loa_gunsldream.png" alt="Post 3" />
            <div className={styles.postInfo}>
              <p>갓 겜</p>
              <span>68</span>
            </div>
          </div>
          <div className={styles.post}>
            <img src="/shiroko_ddabong.png" alt="Post 4" />
            <div className={styles.postInfo}>
              <p>입니다</p>
              <span>46</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
