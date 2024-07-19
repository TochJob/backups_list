<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { Backup } from '../typos/types'
import CModal from '@/components/CModal.vue'
import { useBackupStore } from '../store/backups'
import { useMainStore } from '@/store/main'
const props = defineProps<{ backup: Backup; index: number }>()

const store = useBackupStore()
const mainStore = useMainStore()

const currentModal = ref(0)
const modalText = ref('')
const buttonsList = [
  {
    id: 0,
    text: 'Restore',
    color: 'bg-blue-500',
    action: function (id: number) {
      currentModal.value = id
      openModal('restore')
    }
  },
  {
    id: 1,
    text: 'Delete',
    color: 'bg-red-500',
    action: function (id: number) {
      currentModal.value = id
      openModal('delete')
    }
  }
]

const isModalVisible = ref(false)

const isWarningButton = computed((): boolean => (currentModal.value === 0 ? false : true))

const confirmAction = (): void => {
  currentModal.value === 0
    ? mainStore.showAlert('Backup restored', 'done')
    : store.deleteBackup(String(props.backup.id))
}

const openModal = (type: string): void => {
  modalText.value =
    type === 'delete'
      ? 'Are you sure you want to permanently delete this backup?'
      : 'Are you sure you want to restore your backup?'
  isModalVisible.value = true
}
const closeModal = (): void => {
  isModalVisible.value = false
}
const handleButtonClick = (buttonId: number): void => {
  const button = buttonsList.find((b) => b.id === buttonId)
  if (!button) return
  button.action(buttonId)
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
      <button
        v-for="item of buttonsList"
        :key="item.id"
        class="px-4 py-2 text-white rounded"
        :class="item.color"
        @click="handleButtonClick(item.id)"
      >
        {{ item.text }}
      </button>
    </div>
  </div>

  <CModal
    v-model="isModalVisible"
    @confirm="confirmAction"
    @cancel="closeModal"
    :warning="isWarningButton"
  >
    <template #header>
      <p class="text-gray-500 dark:text-gray-400">
        {{ modalText }}
      </p>
    </template>
  </CModal>
</template>
