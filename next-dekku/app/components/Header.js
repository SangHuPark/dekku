// app/components/Header.js
import Link from 'next/link';
import '../styles/Header.css'; // 스타일 파일을 추가로 임포트

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link href="/">dekku</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/threeD">3D Desk</Link>
          </li>
          <li>
            <Link href="/deskSetup">데스크셋업</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
