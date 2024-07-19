import { defineStore } from 'pinia'
import type { LoginData } from '../typos/types'
import axios from 'axios'
import API_ENV from '../api/api.config'
const { apiAuthSign } = API_ENV

export const useAuthStore = defineStore('auth', {
  state: () => ({
    backups: [],
    isAuthenticated: false
  }),
  actions: {
    async authenticate(obj: LoginData): Promise<void> {
      try {
        const { data } = await axios.get<LoginData[]>(apiAuthSign)
        this.compareUser({ obj, data })
        this.isAuthenticated = true
        localStorage.setItem('isAuthenticated', 'true')
      } catch (error) {
        console.error('Authentication failed:', error)
        throw new Error('Authentication failed')
      }
    },
    logout(): void {
      this.isAuthenticated = false
      localStorage.removeItem('isAuthenticated')
    },
    compareUser(info: { obj: LoginData; data: LoginData[] }): void {
      const { obj, data } = info
      const foundUser = data.find(
        (item) => item.name === obj.name && item.password === obj.password
      )
      if (!foundUser) {
        throw new Error('User not found')
      }
    }
  }
})
