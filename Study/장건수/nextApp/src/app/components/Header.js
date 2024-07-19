import Link from "next/link";
export default function Header() {
  return (
    <header className="w-screen flex justify-center px-4 fixed top-0 left-0 h-20 bg-white z-50 shadow">
      <div className="w-full max-w-screen-xl flex justify-between px-auto">
        <Link href="/" className="h-10 self-center md:h-12">
          <img src="logo.png" className="h-10 self-center md:h-12"></img>
        </Link>
        <div className="mt-2">
          <div className="text-xs font-bold flex flex-row justify-end font-normal md:text-base">
            <a className="mx-2">고객센터</a>
            <a className="mx-2">마이페이지</a>
            <a className="mx-2">로그인</a>
          </div>
          <div className="flex flex-row justify-end font-semibold mt-1 text-xl font-bold md:text-3xl mr-2">
            <a className="mx-2">3D 데꾸</a>
            <Link href="/Articles">
              데스크셋업
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
