<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">Бэкапы</h2>
      <div class="mb-4">
        <label class="block mb-1">Выберите проект для создания бэкапа</label>
        <select v-model="selectedProject" class="w-full px-3 py-2 border rounded">
          <option v-for="project in projects" :key="project" :value="project">{{ project }}</option>
        </select>
        <button @click="createBackup" class="mt-2 px-4 py-2 bg-green-500 text-white rounded">
          Создать бэкап
        </button>
      </div>
      <div v-if="isCreatingBackup" class="mb-4 text-blue-500">Создание бэкапа...</div>
      <div v-if="backupsStore.backups.length === 0" class="text-gray-500">Нет бэкапов</div>
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

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useBackupStore } from '../store/backups'
import BackupItem from '../components/BackupItem.vue'

const backupsStore = useBackupStore()
const selectedProject = ref<string>('')
const isCreatingBackup = ref<boolean>(false)

const projects = ['Проект 1', 'Проект 2', 'Проект 3']

const createBackup = () => {
  if (!selectedProject.value) {
    alert('Выберите проект')
    return
  }

  isCreatingBackup.value = true
  setTimeout(() => {
    backupsStore.addBackup({
      name: selectedProject.value,
      date: new Date().toLocaleString(),
      size: (Math.random() * 1000).toFixed(2)
    })
    isCreatingBackup.value = false
    selectedProject.value = ''
  }, 5000)
}

onMounted(() => {
  backupsStore.fetchProjects()
})
</script>
