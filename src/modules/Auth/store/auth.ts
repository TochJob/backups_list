import { defineStore } from 'pinia'
import type { loginData } from '../typos/types'
import axios from 'axios'

export const useAuthStore = defineStore('backup', {
  state: () => ({
    backups: [],
    isAuthenticated: false
  }),
  actions: {
    addBackup(backup: {}) {
      this.backups.push(backup)
    },
    deleteBackup(index: number) {
      this.backups.splice(index, 1)
    },
    async authenticate() {
      try {
        await axios.post('http://localhost:3001/users')
      } catch (error) {}

      this.isAuthenticated = true
      localStorage.setItem('isAuthenticated', 'true')
    },
    logout() {
      this.isAuthenticated = false
      localStorage.removeItem('isAuthenticated')
    }
  }
})
