import axios from 'axios'
import { defineStore } from 'pinia'

import type { Backup } from '../typos/types'

export const useBackupStore = defineStore('backup', {
  state: () => ({
    backups: <Backup[]>[],
    isAuthenticated: false,
    token: ''
  }),
  actions: {
    addBackup(backup: Backup) {
      this.backups.push(backup)
    },
    deleteBackup(index: number) {
      this.backups.splice(index, 1)
    },
    authenticate(token: string) {
      this.isAuthenticated = true
      this.token = token
    },
    logout() {
      this.isAuthenticated = false
      this.token = ''
    },
    async fetchProjects() {
      const { data } = await axios.get('http://localhost:3001/backups')

      this.backups = data
    },
    async login(email: string, password: string) {
      const response = await axios.post('http://localhost:3001/login', { email, password })

      if (!response) {
        throw new Error('Ошибка авторизации')
      }

      const data = response.data
      this.authenticate(data.accessToken)
    }
  }
})
