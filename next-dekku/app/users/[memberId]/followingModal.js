"use client";

export default function FollowingModal({ showModal, setShowModal }) {
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
                  <div className="flex flex-col items-center space-y-2 w-full">
                    <div className="w-full">팔로잉 목록</div>
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