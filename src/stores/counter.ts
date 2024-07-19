import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useBackupStore = defineStore('backup', {
  state: () => ({
    backups: useStorage('backups', []),
    isAuthenticated: useStorage('isAuthenticated', false)
  }),
  actions: {
    addBackup(backup: {}) {
      this.backups.push(backup)
    },
    deleteBackup(index: number) {
      this.backups.splice(index, 1)
    },
    authenticate() {
      this.isAuthenticated = true
    },
    logout() {
      this.isAuthenticated = false
    }
  }
})
