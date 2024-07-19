import axios from 'axios'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    alertText: '',
    isAlertVisible: false,
    type: 'error'
  }),
  actions: {
    showAlert(payload: string, type?: string) {
      let text = null
      const defaultErrorText = 'Something went wrong!'

      text = payload
      this.type = type || 'error'
      this.isAlertVisible = true
      this.alertText = text || defaultErrorText
      setTimeout(() => {
        this.type = 'error'
        this.isAlertVisible = false
        this.alertText = defaultErrorText
      }, 5000)
    }
  }
})
