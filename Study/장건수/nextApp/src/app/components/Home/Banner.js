import Link from "next/link";

export default function Banner() {
  return (
    <section className="pt-10 w-full h-[40vh] md:h-[80vh] ">
      <div className="flex flex-row justify-between items-center h-full">
        <form className="w-1/4 md:w-3/5 h-full mr-5 glasses-contents p-5 md:p-10 relative">
          <div>
            <h1 className="text-2xl md:text-5xl font-bold">나만의 3D 데스크를</h1>
            <h1 className="text-2xl md:text-5xl font-bold">디자인하세요</h1>
          </div>
        </form>

        <div className="w-3/4 md:w-2/5 flex flex-col h-full">
          <Link href="/Articles" className="glasses-contents mb-5 w-full h-full p-5 md:p-10">
            <div>
              <h1 className="text-2xl md:text-5xl font-bold ">데스크 셋업</h1>
            </div>
          </Link>

          <form className="glasses-contents h-20 p-5">
            <h1 className="text-xl md:text-2xl font-bold">데스크 셋업 공유하기</h1>
          </form>
        </div>
      </div>
    </section>
  );
}
