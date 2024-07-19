<script lang="ts" setup>
import { computed } from 'vue'

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const props = defineProps<{ modelValue: boolean; warning?: boolean }>()

const closeModal = () => {
  emit('update:modelValue', false)
}

const confirmDelete = () => {
  emit('confirm')
  closeModal()
}

const cancelDelete = () => {
  emit('cancel')
  closeModal()
}

const buttonClasses = computed(() => {
  return {
    'bg-blue-500 hover:bg-blue-800 focus:ring-blue-500 dark:focus:ring-blue-800': !props.warning,
    'bg-red-600 hover:bg-red-800 focus:ring-red-500 dark:focus:ring-red-800': props.warning
  }
})
</script>

<template>
  <div
    v-if="modelValue"
    id="popup-modal"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 d justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-indigo-600 bg-opacity-25"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          @click="closeModal"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            <slot name="header"></slot>
          </h3>
          <button
            @click="confirmDelete"
            type="button"
            class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            :class="buttonClasses"
          >
            Yes, I'm sure
          </button>
          <button
            @click="cancelDelete"
            type="button"
            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
