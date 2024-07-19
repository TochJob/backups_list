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
    async addBackup(backup: Backup): Promise<Backup[] | undefined> {
      try {
        const { data } = await axios.post<Backup[]>(apiBackups, backup)
        this.backups.push(backup)
        return data
      } catch (error) {
        console.error(error)
      }
      this.backups.push(backup)
    },
    async deleteBackup(id: string): Promise<void> {
      try {
        await axios.delete(`${apiBackups}/${id}`)
        const findedIndex = this.backups.findIndex((item) => item.id === id)
        this.backups.splice(findedIndex, 1)
      } catch (error) {
        console.error(error)
      }
    },
    async fetchBackups(): Promise<void> {
      try {
        const { data } = await axios.get<Backup[]>(apiBackups)
        this.backups = data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchProjects(): Promise<void> {
      try {
        const { data } = await axios.get<Project[]>(apiProjects)
        this.projects = data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
