<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/store/main'

const store = useAuthStore()
const mainStore = useMainStore()

const router = useRouter()

const username = ref<string>('')
const password = ref<string>('')

const login = async () => {
  if (!username.value || !password.value) {
    mainStore.showAlert('Enter username and password')
    return
  }

  try {
    await store.authenticate({ name: username.value, password: password.value })
    router.push('/')
  } catch (error) {
    mainStore.showAlert('Enter the correct username and password')
    console.error('Ошибка при аутентификации:', error)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-200">
    <div class="p-10 bg-white rounded shadow-xl">
      <h1 class="text-2xl font-bold mb-4">Sign in Fornex backups</h1>
      <form class="flex flex-col gap-4" @submit.prevent="login">
        <div class="flex flex-col gap-2">
          <div>
            <label class="block mb-1"
              >Username
              <input v-model="username" class="w-full px-3 py-2 border rounded" />
            </label>
          </div>
          <div>
            <label class="block mb-1"
              >Password
              <input type="password" v-model="password" class="w-full px-3 py-2 border rounded" />
            </label>
          </div>
        </div>
        <button class="w-full px-4 py-2 bg-blue-500 text-white rounded">Sign in</button>
      </form>
    </div>
  </div>
</template>
