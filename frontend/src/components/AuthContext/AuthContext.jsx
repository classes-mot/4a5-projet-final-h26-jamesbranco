import { createContext, useContext, useState, useEffect } from "react";

const AuthCont = createContext();
export const useAuth = () => useContext(AuthCont);

const AuthContext = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔐 LOGIN
  const login = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  // 🔓 LOGOUT
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  // 🔄 RESTORE STATE ON REFRESH
  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");

    if (stored === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthCont.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthCont.Provider>
  );
};

export default AuthContext;
