import React, { createContext, useContext, useState, useEffect } from "react";

// 로그인 상태 전역적으로 쓰기 위해 context API 사용 -> prop drilling을 피함
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState(null);
  useEffect(() => {
    // 클라이언트 사이드에서만 실행됨
    const accessToken = window.localStorage.getItem("access");
    const userName = window.localStorage.getItem("name");

    setIsLoggedIn(!!accessToken);
    setLoginUser(userName);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loginUser, setLoginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useLogin = () => useContext(AuthContext);
export default AuthProvider;
