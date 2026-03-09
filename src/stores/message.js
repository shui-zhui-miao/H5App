import { defineStore } from 'pinia'
import messagesData from '../data/message.json'

export const useMessagesStore = defineStore('message', {
    state: () => ({
        chat: messagesData,  // 初始化为本地 JSON
    }),
    actions: {
        getMessagesByChatId(chatId) {
            return this.chat.filter(msg => msg.chatId === chatId)
        }
    }
})