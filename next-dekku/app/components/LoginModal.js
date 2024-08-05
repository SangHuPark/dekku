"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const KAKAO_APP_KEY = '49e8b661f0b102fb6d48af8f9d51ae58'; // 환경 변수 사용

export default function LoginModal({ showModal, setShowModal }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadKakaoSdk = () => {
      // Kakao SDK 스크립트가 이미 페이지에 존재하는지 확인
      if (document.getElementById("kakao-sdk")) return;

      const script = document.createElement("script");
      script.id = "kakao-sdk";
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.onload = () => {
        // 스크립트 로드 완료 후 초기화
        window.Kakao.init(KAKAO_APP_KEY);
        console.log("Kakao SDK loaded and initialized");
      };
      document.head.appendChild(script);
    };

    if (!window.Kakao) {
      loadKakaoSdk();
    } else {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_APP_KEY);
      }
    }
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        console.log("Kakao login success. Auth object:", authObj);
        // 백엔드와의 세션 관리나 인증을 추가할 수 있습니다
        fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: authObj.access_token }),
        })
          .then(() => {
            router.push("/"); // 성공적인 통합 후 홈으로 리다이렉트
          })
          .catch((error) => {
            console.error("Backend auth failed:", error);
          });
      },
      fail: function (err) {
        console.error("Failed to login with Kakao:", err);
        alert("로그인 실패: " + err.error_description); // 피드백 제공
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("password", password);

    try {
      const response = await fetch("/api/posts", {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/");
      } else {
        throw new Error('Login failed');
      }
      if (response.ok) {
        router.push("/");
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error("Error:", error);
      alert('Login error: ' + error.message); // 피드백 제공
      alert('Login error: ' + error.message); // 피드백 제공
    }
  };


  return (
    showModal && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
            <div className="flex justify-end items-center mb-4">
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setShowModal(false)}
              >
                &#x2715;
              </button>
            </div>
            <div className="flex justify-center mb-8">
              <img src="/logo.png" alt="Logo" className="my-10 w-40" />
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="mt-2 w-full">
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center space-y-2 w-full"
                  >
                    <div className="w-full">
                      <button
                        onClick={handleKakaoLogin}
                        className="shadow w-full inline-flex justify-center items-center px-4 py-4 border border-transparent text-2xl font-medium rounded-md shadow-sm text-black bg-[#FDDC3F] hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        <img
                          src="/kakao_icon.svg"
                          className="absolute left-10 w-10 h-10 items-start"
                          alt="kakao"
                        />
                        카카오 로그인
                      </button>
                    </div>
                    <div className="w-full">
                      <button
                        href="http://localhost:8080/oauth2/authorization/naver"
                        className="shadow w-full inline-flex justify-center items-center px-4 py-4 border border-transparent text-2xl font-medium rounded-md shadow-sm text-white bg-[#03C75A] hover:bg-[#04A94D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        <img
                          src="/naver_icon.svg"
                          className="absolute left-10 w-10 h-10 items-start"
                          alt="naver"
                        />
                        네이버 로그인
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
