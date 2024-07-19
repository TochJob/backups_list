<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth.ts'
import { useRouter } from 'vue-router'

const store = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')

const login = () => {
  store.authenticate()
  if (username.value && password.value) {
    router.push('/backups')
  } else {
    alert('Введите имя пользователя и пароль')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="p-8 bg-white rounded shadow-md">
      <h2 class="text-2xl font-bold mb-4">Sign in Fornex backups</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block mb-1">Username</label>
          <input v-model="username" class="w-full px-3 py-2 border rounded" />
        </div>
        <div class="mb-4">
          <label class="block mb-1">Password</label>
          <input type="password" v-model="password" class="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white rounded">
          Sign in
        </button>
      </form>
    </div>
  </div>
</template>
