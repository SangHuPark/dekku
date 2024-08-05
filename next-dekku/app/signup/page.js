export default function signup() {
  return (
    <div className="max-w-2xl mx-auto mt-20 flex flex-col space-y-4">
      <div className="text-4xl font-bold mb-4">회원가입</div>
      <ul className=" space-y-2">
        <li>
          <h3>이메일 인증</h3>
          <div className="flex flex-row gap-4">
            <input
              className="border-2 border-gray-300 rounded p-4 placehoder-gray-400"
              placeholder="이메일 입력"
            />
            <div className="flex items-center text-2xl">@</div>
            <input
              className="border-2 border-gray-300 rounded p-4 placehoder-gray-400"
              placeholder="이메일 입력"
            />
            <button className="flex-grow bg-[#35C5F0] rounded-lg py-4 text-2xl text-white">
              인증
            </button>
          </div>
        </li>
        <li>
          <h3>비밀번호</h3>
          <input
            className="w-full border-2 border-gray-300 rounded p-4 placehoder-gray-400"
            placeholder="비밀번호 입력 ( 8자 ~ 20자 )"
          />
        </li>
        <li>
          <h3>비밀번호 확인</h3>
          <input
            className="w-full border-2 border-gray-300 rounded p-4 placehoder-gray-400"
            placeholder="비밀번호 재입력"
          />
        </li>
        <li>
          <h3>닉네임</h3>
          <input
            className="w-full border-2 border-gray-300 rounded p-4 placehoder-gray-400"
            placeholder="닉네임을 입력해주세요"
          />
        </li>
      </ul>
      <button className="bg-[#35C5F0] rounded-lg py-4 text-2xl text-white">
        전화번호 인증
      </button>
      <button className="bg-gray-300 rounded-lg py-4 text-2xl text-white">
        회원 가입
      </button>
    </div>
  );
}
