import { defineStore } from 'pinia'
import usersData from '../data/users.json'
import { useCurrentUserStore } from './currentUser'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: usersData,  // 初始化为本地 JSON
  }),
  actions: {
    getUserById(id) {
      return this.users.find(user => user.userId === id)
    },
    getOtherUserInChat(chatUserIds) {
      const currentUserStore = useCurrentUserStore()
      const myId = currentUserStore.currentUser.userId
      const otherId = chatUserIds.find(id => id !== myId)
      return this.getUserById(otherId)
    }
  }
})