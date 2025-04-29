import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthStore {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
}

const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string) => set({ token }),
      removeToken: () => set({ token: null }),
    }),
    {
      name: "auth-store",
    }
  )
);

export default useAuthStore;
