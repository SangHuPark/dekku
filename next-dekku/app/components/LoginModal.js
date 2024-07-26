"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginModal({ showModal, setShowModal }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("password", password);

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    showModal && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div className="flex justify-end items-center mb-4">
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setShowModal(false)}
              >
                &#x2715;
              </button>
            </div>
            <div className="flex justify-center mb-8">
              <img src="/logo_black.png" alt="Logo" className="w-40"/>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="mt-2 w-full">
                  <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-2 w-full">
                    <div className="w-full">
                      <label htmlFor="id" className="block font-medium text-gray-700">아이디</label>
                      <input
                        id="id"
                        type="text"
                        
                        name="id" 
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="text-black w-full mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="password" className="block font-medium text-gray-700">비밀번호</label>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-black w-full mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="w-full flex justify-between items-center mt-4">
                      <div>
                        <input type="checkbox" id="remember" className="mr-2" />
                        <label htmlFor="remember" className="text-sm text-gray-700">로그인 유지</label>
                      </div>
                      <a href="/forgot-password" className="text-sm text-gray-700">아이디/비밀번호 찾기</a>
                    </div>
                    <div className="w-full">
                      <button
                        type="submit"
                        className="shadow w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      >
                        로그인
                      </button>
                    </div>
                    <div className="w-full">
                      <button
                        type="button"
                        className="shadow w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        카카오 로그인
                      </button>
                    </div>
                    <div className="w-full">
                      <button
                        type="button"
                        className="shadow w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        구글 로그인
                      </button>
                    </div>
                  </form>
                  <div className="w-full text-center mt-4">
                    <span className="text-sm text-gray-700">회원이 아니신가요?</span> <a href="/signup" className="text-sm text-blue-600">회원가입</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
