import { defineStore } from 'pinia'
import type { loginData } from '../typos/types'
import axios from 'axios'
import API_ENV from '../api/api.config'
const { apiAuth } = API_ENV

export const useAuthStore = defineStore('auth', {
  state: () => ({
    backups: [],
    isAuthenticated: false
  }),
  actions: {
    async authenticate() {
      try {
        await axios.post(apiAuth)
      } catch (error) {
        console.error(error)
      }

      this.isAuthenticated = true
      localStorage.setItem('isAuthenticated', 'true')
    },
    logout() {
      this.isAuthenticated = false
      localStorage.removeItem('isAuthenticated')
    }
  }
})
