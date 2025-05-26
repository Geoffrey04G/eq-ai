import { create } from 'zustand';

const useStore = create((set) => ({
  messages: [],
  loading: false,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (loading) => set({ loading }),
  clearMessages: () => set({ messages: [] }),
  user: null,
  setUser: (user) => set({ user }),
}));

export default useStore;