<script lang="ts" setup>
import { ref } from 'vue'
import { useBackupStore } from '../store/backups'
import type { Backup } from '../typos/types'

import CModal from '@/components/CModal.vue'

const props = defineProps<{ backup: Backup; index: number }>()

const store = useBackupStore()

const isDeleteModalVisible = ref<boolean>(false)
const isRestoreModalVisible = ref<boolean>(false)

const closeModal = (): void => {
  isDeleteModalVisible.value = false
  isRestoreModalVisible.value = false
}

const restoreBackup = (): void => {
  isRestoreModalVisible.value = true
}

const confirmDelete = (): void => {
  store.deleteBackup(props.backup.id)
}

const openDeleteModal = (): void => {
  isDeleteModalVisible.value = true
}
const openRestoreModal = (): void => {
  isRestoreModalVisible.value = true
}
</script>
<template>
  <div class="p-4 bg-white rounded shadow-md mb-4 flex items-start justify-between">
    <div>
      <h3 class="text-lg font-bold">{{ backup.name }}</h3>
      <p>Date: {{ backup.date }}</p>
      <p>Size: {{ backup.size }} MB</p>
    </div>
    <div class="mt-2 flex space-x-2">
      <button @click="openRestoreModal" class="px-4 py-2 bg-blue-500 text-white rounded">
        Restore
      </button>
      <button @click="openDeleteModal" class="px-4 py-2 bg-red-500 text-white rounded">
        Delete
      </button>
    </div>
  </div>

  <CModal v-model="isDeleteModalVisible" @confirm="confirmDelete" @cancel="closeModal" warning>
    <template #header>
      <p class="text-gray-500 dark:text-gray-400">
        Are you sure you want to permanently delete this product?
      </p>
    </template>
  </CModal>
  <CModal v-model="isRestoreModalVisible" @confirm="restoreBackup" @cancel="closeModal">
    <template #header>
      <p class="text-gray-500 dark:text-gray-400">Are you sure you want to restore your backup?</p>
    </template>
  </CModal>
</template>
