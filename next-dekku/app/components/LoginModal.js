"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginModal({ showModal, setShowModal }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showModal) {
      setIsVisible(true);
    } else {
      // Use a timeout to wait for the fade-out animation to complete
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto transition-opacity ${
        showModal ? "opacity-100" : "opacity-0"
      } ${isVisible ? "visible" : "invisible"}`}
      style={{ transition: "opacity 300ms ease-in-out" }}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className={`absolute inset-0 bg-gray-500 transition-opacity ${
              showModal ? "opacity-75" : "opacity-0"
            }`}
            style={{ transition: "opacity 300ms ease-in-out" }}
          ></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-4 sm:align-middle sm:max-w-sm sm:w-full sm:p-4 ${
            showModal ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transition: "transform 300ms ease-out, opacity 300ms ease-out" }}
        >
          <div className="flex justify-end items-center">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              &#x2715;
            </button>
          </div>
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="Logo" className="w-40" />
          </div>
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <div className="mt-2 w-full">
                <div className="flex flex-col items-center space-y-2 w-full">
                  <div className="w-full">
                    <a
                      href="http://dekku.co.kr:8080/oauth2/authorization/kakao"
                      className="shadow w-full inline-flex justify-center items-center px-4 py-4 border border-transparent font-medium rounded-md text-black bg-[#FDDC3F] hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 relative"
                    >
                      <img
                        src="/kakao_icon.svg"
                        className="absolute left-10 w-10 h-10 items-start"
                        alt="kakao"
                      />
                      카카오로 로그인
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
