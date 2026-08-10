import { createContext, useContext } from "react";
import { ID } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
  // user: Models.User <Models.Preferences> | null
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
};
const Authcontext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const signUp = async (email: string, password: string) => {
    try {
      await account.create(ID.unique(), email, password);
      return await signIn(email, password);
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "error occured during sign up ";
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "error occured during sign in ";
    }
  };
  return (
    <Authcontext.Provider value={{ signIn, signUp }}>
      {children}
    </Authcontext.Provider>
  );
}

export function useAuth() {
  const context = useContext(Authcontext);
  if (context === undefined) {
    throw new Error("useAuth must be used with authprovider");
  }
  return context;
}
