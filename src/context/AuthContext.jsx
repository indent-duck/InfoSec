import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  console.log("AuthProvider component loaded");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider: Checking for existing token...");
    const token = localStorage.getItem("token");
    console.log("Token found:", token ? "Yes" : "No");
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Token decoded:", decoded);
        if (decoded.exp * 1000 > Date.now()) {
          console.log("Token valid, setting user");
          setUser({ token, ...decoded });
        } else {
          console.log("Token expired, removing");
          localStorage.removeItem("token");
        }
      } catch {
        console.log("Token invalid, removing");
        localStorage.removeItem("token");
      }
    }
    console.log("AuthProvider: Setting loading to false");
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
  