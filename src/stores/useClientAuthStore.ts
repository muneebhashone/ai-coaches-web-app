import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IClientAuthStore {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
}

const useClientAuthStore = create<IClientAuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string) => set({ token }),
      removeToken: () => set({ token: null }),
    }),
    {
      name: "client-auth-store",
    }
  )
);

export default useClientAuthStore;
