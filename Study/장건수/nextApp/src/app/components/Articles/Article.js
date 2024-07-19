import Link from "next/link";

const contentForm = () => {
  return `
      <form className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="p-10 bg-red-200 ">
            {/* 데스크 이미지 */}
            <img src="logo.png" alt="Logo" className="w-full"></img>

            {/* 좋아용 */}
            <div>
              {/* 게시글 번호 */}
              <div></div>
              <div className="my-2 flex flex-row justify-end">좋아요?</div>
            </div>

            {/* 사용자 정보 */}
            <div className="flex flex-row items-center">
              <img src="logo.png" className="h-5 mr-2" alt="Logo"></img>
              <div className="flex flex-col">
                <span className="">한국최고IloveKorea</span>
                <span>역시 데스크테리어는 한국풍이지~ 다른 데는 별로야</span>
              </div>
            </div>
          </div>
        </form>
    `;
};
export default function Article() {
  return (
    <section className=" max-w-screen-xl bg-black mt-10 flex flex-col w-full">
      <h1 className="tex-4xl text-white">모든 데스크 셋업</h1>
      <div className="flex flex-row justify-between">
        {/* 정렬 필터 상세검색 */}
        <div>
          <span className="text-white">버튼</span>
          <span className="text-white">버튼</span>
          <span className="text-white">버튼</span>
        </div>
        {/* 게시물버튼 */}
        <div>
          <button className="text-white">버튼</button>
        </div>
      </div>

      {/* 게시물 */}
      <main className="flex flex-wrap justify-start box-border">
        <form className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="p-10 bg-red-200 ">
            {/* 데스크 이미지 */}
            <img src="logo.png" alt="Logo" className="w-full"></img>

            {/* 좋아용 */}
            <div>
              {/* 게시글 번호 */}
              <div></div>
              <div className="my-2 flex flex-row justify-end">좋아요?</div>
            </div>

            {/* 사용자 정보 */}
            <div className="flex flex-row items-center">
              <img src="logo.png" className="h-5 mr-2" alt="Logo"></img>
              <div className="flex flex-col">
                <span className="">한국최고IloveKorea</span>
                <span>역시 데스크테리어는 한국풍이지~ 다른 데는 별로야</span>
              </div>
            </div>
          </div>
        </form>
        <form className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="p-10 bg-red-200 ">
            {/* 데스크 이미지 */}
            <img src="logo.png" alt="Logo" className="w-full"></img>

            {/* 좋아용 */}
            <div>
              {/* 게시글 번호 */}
              <div></div>
              <div className="my-2 flex flex-row justify-end">좋아요?</div>
            </div>

            {/* 사용자 정보 */}
            <div className="flex flex-row items-center">
              <img src="logo.png" className="h-5 mr-2" alt="Logo"></img>
              <div className="flex flex-col">
                <span className="">한국최고IloveKorea</span>
                <span>역시 데스크테리어는 한국풍이지~ 다른 데는 별로야</span>
              </div>
            </div>
          </div>
        </form>
        <form className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="p-10 bg-red-200 ">
            {/* 데스크 이미지 */}
            <img src="logo.png" alt="Logo" className="w-full"></img>

            {/* 좋아용 */}
            <div>
              {/* 게시글 번호 */}
              <div></div>
              <div className="my-2 flex flex-row justify-end">좋아요?</div>
            </div>

            {/* 사용자 정보 */}
            <div className="flex flex-row items-center">
              <img src="logo.png" className="h-5 mr-2" alt="Logo"></img>
              <div className="flex flex-col">
                <span className="">한국최고IloveKorea</span>
                <span>역시 데스크테리어는 한국풍이지~ 다른 데는 별로야</span>
              </div>
            </div>
          </div>
        </form>
        <form className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="p-10 bg-red-200 ">
            {/* 데스크 이미지 */}
            <img src="logo.png" alt="Logo" className="w-full"></img>

            {/* 좋아용 */}
            <div>
              {/* 게시글 번호 */}
              <div></div>
              <div className="my-2 flex flex-row justify-end">좋아요?</div>
            </div>

            {/* 사용자 정보 */}
            <div className="flex flex-row items-center">
              <img src="logo.png" className="h-5 mr-2" alt="Logo"></img>
              <div className="flex flex-col">
                <span className="">한국최고IloveKorea</span>
                <span>역시 데스크테리어는 한국풍이지~ 다른 데는 별로야</span>
              </div>
            </div>
          </div>
        </form>
        <form className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="p-10 bg-red-200 ">
            {/* 데스크 이미지 */}
            <img src="logo.png" alt="Logo" className="w-full"></img>

            {/* 좋아용 */}
            <div>
              {/* 게시글 번호 */}
              <div></div>
              <div className="my-2 flex flex-row justify-end">좋아요?</div>
            </div>

            {/* 사용자 정보 */}
            <div className="flex flex-row items-center">
              <img src="logo.png" className="h-5 mr-2" alt="Logo"></img>
              <div className="flex flex-col">
                <span className="">한국최고IloveKorea</span>
                <span>역시 데스크테리어는 한국풍이지~ 다른 데는 별로야</span>
              </div>
            </div>
          </div>
        </form>
      </main>
    </section>
  );
}
