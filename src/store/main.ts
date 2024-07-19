import axios from 'axios'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    alertText: 'Something went wrong!',
    isAlertVisible: false
  }),
  actions: {
    showAlert(payload: string) {
      let text = null

      text = payload

      this.isAlertVisible = true
      this.alertText = text || 'Что-то пошло не так!'
      setTimeout(() => {
        this.isAlertVisible = false
        this.alertText = 'Что-то пошло не так!'
      }, 4000)
    }
  }
})
