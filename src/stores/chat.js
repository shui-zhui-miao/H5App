import { defineStore } from 'pinia'
import chatsData from '../data/chat.json'

export const useChatsStore = defineStore('chat', {
    state: () => ({
        chat: chatsData,  // 初始化为本地 JSON
    }),
    actions: {
        getChatById(chatId) {
            return this.chat.find(c => c.chatId === chatId)
        }
    }
})