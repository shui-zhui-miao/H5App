import { defineStore } from 'pinia'
import usersData from '../data/users.json'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: usersData,  // 初始化为本地 JSON
  }),
  actions: {
    getUserById(id) {
      return this.users.find(user => user.userId === id)
    }
  }
})