import axios from 'axios'
import { defineStore } from 'pinia'

import type { Backup, Project } from '../typos/types'
import API_ENV from '@/config/api.config'

const { apiBackups, apiProjects } = API_ENV

export const useBackupStore = defineStore('backup', {
  state: () => ({
    backups: <Backup[]>[],
    projects: <Project[]>[]
  }),
  actions: {
    async addBackup(backup: Backup) {
      try {
        const { data } = await axios.post(apiBackups, backup)
        return data
      } catch (error) {}
      this.backups.push(backup)
    },
    async deleteBackup(id: string) {
      try {
        await axios.delete(`${apiBackups}/${id}`)
        const findedIndex = this.backups.findIndex((item) => item.id === id)
        this.backups.splice(findedIndex, 1)
      } catch (error) {
        console.error(error)
      }
    },
    async fetchBackups() {
      try {
        const { data } = await axios.get(apiBackups)
        this.backups = data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchProjects() {
      try {
        const { data } = await axios.get(apiProjects)
        this.projects = data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
