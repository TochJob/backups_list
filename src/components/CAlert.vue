<script setup lang="ts">
import { useMainStore } from '@/store/main'
import { ref } from 'vue'

const isAlertShown = ref(true)

const store = useMainStore()
</script>

<template>
  <transition name="slide">
    <div
      v-if="isAlertShown"
      class="rounded bg-red-500 text-white fixed top-5 right-0 p-2 transition-transform duration-300 ease-in-out transform translate-x-full"
      :class="{ 'translate-x-0': store.isAlertVisible }"
    >
      {{ store.alertText }}
    </div>
  </transition>
</template>
