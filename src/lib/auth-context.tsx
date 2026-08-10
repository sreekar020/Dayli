import { createContext, useContext, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
type AuthContextType = {
  login: (email: string, password: string) => Promise<string | null>;
  register: (email: string, password: string) => Promise<string | null>;
  user: Models.User<Models.Preferences> | null;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );

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
      try {
        await account.deleteSession("current");
      } catch {}
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      setUser(response);
      return null;
    } catch (error) {
      console.log(`login error ${error}`);
    }
    return "login failed";
  }

  return (
    <AuthContext.Provider value={{ user, login, register }}>
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
