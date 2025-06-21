import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // No loading for mock auth

  const value = {
    user,
    loading,
    setUser, // Add setUser for manual control
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
