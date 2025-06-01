import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/models/client/config";

export interface UserPrefs {
  reputation: number;
}

// Step 1: Define the interface
interface IAuthStore {
  session: Models.Session | null;
  jwt: string | null;
  user: Models.User<UserPrefs> | null;
  hydrated: boolean;
  error: AppwriteException | null;

  setHydrated(): void;
  verifySession(): Promise<void>;
  createAccount(
    name: string,
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  login(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  logout(): Promise<void>;
  refreshSession(): Promise<void>;
}

// Step 2: Create the store using Zustand and persist middleware
export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,
      error: null,

      setHydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        set({ error: null });
        try {
          const session = await account.getSession("current");
          const [user, { jwt }] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT(),
          ]);
          set({ session, user, jwt, error: null });
        } catch (error) {
          console.error("Session verification failed:", error);
          set({ session: null, user: null, jwt: null });
          if (error instanceof AppwriteException) {
            set({ error });
          }
        }
      },

      async login(email: string, password: string) {
        try {
          const session = await account.createEmailPasswordSession(
            email,
            password
          );
          const [user, { jwt }] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT(),
          ]);
          if (!user.prefs?.reputation)
            await account.updatePrefs<UserPrefs>({
              reputation: 0,
            });

          set({ session, user, jwt });

          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async createAccount(name: string, email: string, password: string) {
        try {
          await account.create(ID.unique(), email, password, name);
          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async logout() {
        try {
          await account.deleteSessions();
          set({ session: null, jwt: null, user: null });
        } catch (error) {
          console.log(error);
        }
      },

      async refreshSession() {
        try {
          const session = await account.getSession("current");
          const { jwt } = await account.createJWT();
          set({ session, jwt });
        } catch (error) {
          console.log(error);
        }
      },
    })),
    {
      name: "auth",
      partialize: (state) => ({
        session: state.session,
        jwt: state.jwt,
        user: state.user,
        hydrated: state.hydrated,
      }),
      onRehydrateStorage() {
        return (state, error) => {
          if (error) {
            console.error("Storage rehydration error:", error);
          }
          state?.setHydrated();
        };
      },
    }
  )
);
