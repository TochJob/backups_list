<script lang="ts" setup>
import { useBackupStore } from '../store/backups'

import type { Backup } from '../typos/types'

const props = defineProps<{ backup: Backup; index: number }>()

const store = useBackupStore()

const restoreBackup = () => {
  if (confirm('Вы уверены, что хотите восстановить этот бэкап?')) {
    alert('Бэкап восстановлен!')
  }
}

const confirmDelete = () => {
  if (confirm('Вы уверены, что хотите удалить этот бэкап?')) {
    store.deleteBackup(props.backup.id)
  }
}
</script>
<template>
  <div class="p-4 bg-gray-100 rounded shadow-md mb-4 flex items-start justify-between">
    <div>
      <h3 class="text-lg font-bold">{{ backup.name }}</h3>
      <p>Date: {{ backup.date }}</p>
      <p>Size: {{ backup.size }} MB</p>
    </div>
    <div class="mt-2 flex space-x-2">
      <button @click="restoreBackup" class="px-4 py-2 bg-blue-500 text-white rounded">
        Restore
      </button>
      <button @click="confirmDelete" class="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
    </div>
  </div>
</template>
