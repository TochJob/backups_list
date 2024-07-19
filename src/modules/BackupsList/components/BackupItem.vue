<template>
  <div class="p-4 bg-gray-100 rounded shadow-md mb-4">
    <h3 class="text-lg font-bold">{{ backup.name }}</h3>
    <p>Дата создания: {{ backup.date }}</p>
    <p>Размер: {{ backup.size }} MB</p>
    <div class="mt-2 flex space-x-2">
      <button @click="restoreBackup" class="px-4 py-2 bg-blue-500 text-white rounded">
        Восстановить
      </button>
      <button @click="confirmDelete" class="px-4 py-2 bg-red-500 text-white rounded">
        Удалить
      </button>
    </div>
  </div>
</template>

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
    store.deleteBackup(props.index)
  }
}
</script>
