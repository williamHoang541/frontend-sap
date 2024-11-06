import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const savedAuth = localStorage.getItem("authData");
        return savedAuth ? JSON.parse(savedAuth) : null;
      });
    
      // Cập nhật `localStorage` mỗi khi `auth` thay đổi
      useEffect(() => {
        if (auth) {
          localStorage.setItem("authData", JSON.stringify(auth));
        } else {
          localStorage.removeItem("authData"); // Xóa nếu không có `auth`
        }
      }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;