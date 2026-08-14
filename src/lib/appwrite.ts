if (typeof window !== "undefined" && !(window as any).localStorage) {
  (window as any).localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
}

import { Account, Client, Databases} from "react-native-appwrite";

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME!);

export const account = new Account(client);
export const databases = new Databases(client);


export const DB_ID = process.env.EXPO_PUBLIC_DB_ID;
export const HABIT_DB_ID = process.env.EXPO_PUBLIC_HABIT_DB_ID;


export interface realtimeResponse{
  events:string[];
  payload:any;

}
