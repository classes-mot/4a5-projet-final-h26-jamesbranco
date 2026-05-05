import { createContext, useContext, useState, useEffect } from "react";

const AuthCont = createContext();
export const useAuth = () => useContext(AuthCont);

const AuthContext = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    sessionStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };
  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
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
