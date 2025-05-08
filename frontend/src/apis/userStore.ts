import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  user_id: number;
  email: string;

  is_member: boolean | string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-store", // localStorage에 저장됨
    },
  ),
);
