// app/components/MainContent.js
import '../styles/HomeContent.css'

const MainContent = () => {
  return (
    <div className="main-content">
      <section className="intro">
        <h1>나만의 3D 데스크를 디자인하세요</h1>
      </section>
      <section className="current-events">
        <h2>현재 진행중인 이벤트</h2>
      </section>
      <section className="best-desk-setup">
        <h2>Best Desk Set Up</h2>
      </section>
    </div>
  );
};

export default MainContent;
