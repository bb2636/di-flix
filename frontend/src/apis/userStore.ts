import { create } from 'zustand';

export interface User {
    user_id: number;
    email: string;
    is_member:string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
