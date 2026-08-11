import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
type AuthContextType = {
  login: (email: string, password: string) => Promise<string | null>;
  register: (email: string, password: string) => Promise<string | null>;
  user: Models.User<Models.Preferences> | null;
  Logout: () => Promise<string | null>;
  loading: boolean;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );
  const [loading, setloading] = useState<boolean>(true);

  async function register(email: string, password: string) {
    try {
      await account.create(ID.unique(), email, password);
      return await login(email, password);
    } catch (error) {
      console.log(`login error ${error}`);
    }
    return "registration failed";
  }
  async function login(email: string, password: string) {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
      return null;
    } catch {}
    try {
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      setUser(currentUser);
      return null;
    } catch (error) {
      console.log(`login error ${error}`);
    }
    return "login failed";
  }

  async function Logout() {
    try {
      await account.deleteSession("current");
      setUser(null);
      return null;
    } catch (error) {
      console.log(`logout error ${error}`);
      return "logout failed";
    }
  }
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentuser = await account.get();
      setUser(currentuser);
    } catch (error) {
      setUser(null);
    } finally {
      setloading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, Logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
