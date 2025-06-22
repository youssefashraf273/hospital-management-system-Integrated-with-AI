// import { useAuthCheck } from "@/hooks/useAuth";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User } from "@/types";

type AuthContextType = {
  user: User | undefined;
  isLoading: boolean;
  onLoginSuccess: (user: User, token: string, role: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const { user: response, isAuthCheckLoading, authCheckError } = useAuthCheck(true);

  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   if (isAuthCheckLoading) return;

  //   if (authCheckError) {
  //     setUser(undefined);
  //     localStorage.removeItem("user");
  //     localStorage.removeItem("token");
  //   } else {
  //     console.log("response", response);
  //     setUser(response?.user);
  //     localStorage.setItem("user", JSON.stringify(response?.user));
  //   }

  //   setIsLoading(false);
  // }, [response, isAuthCheckLoading, authCheckError]);

  //TODO:until the backend do authCheck route

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const onLoginSuccess = useCallback((userData: User, token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ ...userData, role }));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  return (
    <AuthContext.Provider value={{ user, onLoginSuccess, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthCtx = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthCtx must be used within an AuthProvider");
  }
  return context;
};
