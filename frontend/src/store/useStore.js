import { create } from 'zustand';

const useStore = create((set) => ({
  messages: [],
  loading: false,
  chatHistory: [], // New field for storing chat history
  currentChatId: null,
  
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (loading) => set({ loading }),
  clearMessages: () => set({ messages: [] }),
  
  // Chat history management
  addChatToHistory: (chat) => set((state) => ({ 
    chatHistory: [chat, ...state.chatHistory] 
  })),
  
  setChatHistory: (chatHistory) => set({ chatHistory }),
  
  setCurrentChatId: (chatId) => set({ currentChatId: chatId }),
  
  // User management
  user: null,
  setUser: (user) => set({ user }),
}));

export default useStore;