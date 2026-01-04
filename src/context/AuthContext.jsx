import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

// Helper functions for role-based token storage
const getTokenKey = (role) => role === 'admin' ? 'adminToken' : 'userToken';
const getAllTokens = () => {
  return {
    userToken: localStorage.getItem('userToken'),
    adminToken: localStorage.getItem('adminToken')
  };
};
const clearAllTokens = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('adminToken');
  localStorage.removeItem('token'); // Legacy cleanup
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing tokens
    const tokens = getAllTokens();
    const legacyToken = localStorage.getItem('token');
    
    // Migrate legacy token if exists
    if (legacyToken && !tokens.userToken && !tokens.adminToken) {
      try {
        const decoded = jwtDecode(legacyToken);
        const tokenKey = getTokenKey(decoded.role);
        localStorage.setItem(tokenKey, legacyToken);
        localStorage.removeItem('token');
        tokens[decoded.role === 'admin' ? 'adminToken' : 'userToken'] = legacyToken;
      } catch {
        localStorage.removeItem('token');
      }
    }
    
    // Check for valid tokens
    for (const [role, token] of Object.entries(tokens)) {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            setUser({ token, ...decoded });
            break;
          } else {
            localStorage.removeItem(role);
          }
        } catch {
          localStorage.removeItem(role);
        }
      }
    }
    
    setLoading(false);
  }, []);

  const login = (userData) => {
    const tokenKey = getTokenKey(userData.role);
    localStorage.setItem(tokenKey, userData.token);
    setUser(userData);
  };

  const logout = () => {
    if (user) {
      const tokenKey = getTokenKey(user.role);
      localStorage.removeItem(tokenKey);
    }
    setUser(null);
  };

  const switchRole = (targetRole) => {
    const tokens = getAllTokens();
    const targetToken = targetRole === 'admin' ? tokens.adminToken : tokens.userToken;
    
    if (targetToken) {
      try {
        const decoded = jwtDecode(targetToken);
        if (decoded.exp * 1000 > Date.now()) {
          setUser({ token: targetToken, ...decoded });
          return true;
        }
      } catch {}
    }
    return false;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
  