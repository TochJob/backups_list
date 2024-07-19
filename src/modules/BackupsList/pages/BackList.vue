<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useBackupStore } from '../store/backups'
import BackupItem from '../components/BackupItem.vue'
import SSpinner from '@/assets/SVG/SSpinner.vue'
import { useMainStore } from '@/store/main'

const mainStore = useMainStore()
const backupsStore = useBackupStore()
const selectedProject = ref<string>('')
const isCreatingBackup = ref<boolean>(false)
const progressValue = ref<number>(0)

const buttonText = computed(() => (isCreatingBackup.value ? 'Creating...' : 'Create backup'))

const createBackup = async (): Promise<void> => {
  if (isCreatingBackup.value) return
  if (!selectedProject.value) {
    mainStore.showAlert('Firstly choose project')
    return
  }

  isCreatingBackup.value = true

  simulateBackupCreation()

  setTimeout(async (): Promise<void> => {
    await backupsStore.addBackup({
      id: String(backupsStore.backups.length + 1),
      name: selectedProject.value,
      date: new Date().toLocaleString(),
      size: (Math.random() * 1000).toFixed(2)
    })
    isCreatingBackup.value = false
    selectedProject.value = ''
  }, 5000)
}
const simulateBackupCreation = () => {
  progressValue.value = 0
  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      if (progressValue.value < 100) {
        progressValue.value += 10
      } else {
        clearInterval(interval)
        resolve()
      }
    }, 500)
  })
}
onMounted(async (): Promise<void> => {
  try {
    await Promise.all([backupsStore.fetchBackups(), backupsStore.fetchProjects()])
  } catch (error) {
    console.error(error)
  }
})
</script>
<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">Backups</h2>
      <div class="mb-4">
        <label class="block mb-1">Choose project for backup</label>
        <select
          v-model="selectedProject"
          class="w-full bg-white shadow-sm mb-3 px-3 py-2 border rounded"
        >
          <option v-for="project in backupsStore.projects" :key="project.id" :value="project.name">
            {{ project.name }}
          </option>
        </select>
        <div class="flex justify-end items-center gap-2">
          <button
            @click="createBackup"
            class="px-4 flex gap-2 py-2 bg-green-500 text-white rounded"
            :disable="isCreatingBackup"
          >
            {{ buttonText }} <span v-if="isCreatingBackup">{{ progressValue }}%</span>
          </button>
        </div>
      </div>

      <p v-if="backupsStore.backups.length === 0" class="text-gray-500">no available backups</p>
      <div v-else>
        <BackupItem
          v-for="(item, index) in backupsStore.backups"
          :key="item.id"
          :backup="item"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>
