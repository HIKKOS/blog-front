<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import { RouterLink, useRouter } from 'vue-router'

import ProgressSpinner from 'primevue/progressspinner'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import server from '@/config/consts'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
const username = ref('')
const password = ref('')
const logginIn = ref(false)
const router = useRouter()
const showToast = () => {
  console.log('showing toast')
  toast.add({ severity: 'error', summary: 'Error', detail: 'Crenciales incorrectas', life: 3000 })
}
const login = async () => {
  logginIn.value = true
  try {
    const response = await axios.post(`${server}/login`, {
      email: username.value,
      password: password.value
    })
    if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify(response.data))
      router.push({ name: 'home' })
    }
    console.log(response)
  } catch (error) {
    showToast()
    console.error(error)
  } finally {
    logginIn.value = false
  }
}
</script>
<template>
  <Toast />
  <main class="flex justify-center items-center flex-grow">
    <Card class="w-96 p-2">
      <template #title>
        <h1 class="py-2 text-center text-4xl font-bold">Login</h1>
      </template>
      <template #content>
        <form class="flex flex-col space-y-4">
          <label for="username" class="text-xl font-semibold">Correo</label>
          <InputText v-model="username" placeholder="Correo" />
          <label for="password" class="text-xl font-semibold">Contraseña</label>
          <InputText v-model="password" placeholder="Password" type="password" />
          <Divider />
          <RouterLink
            class="py-2"
            :to="{
              name: 'home'
            }"
          >
            <div class="flex flex-row justify-center">
              <Button
                v-if="!logginIn"
                @click="login"
                :disabled="!username || !password"
                class="w-40 h-12"
                >Login</Button
              >

              <ProgressSpinner v-else style="width: 10rem; height: 3rem" class="w-40 h-12" />
            </div>
          </RouterLink>
        </form>
      </template>
      <template #footer>
        <p class="text-center text-xl pt-2">
          ¿No tienes cuenta?
          <RouterLink
            :to="{
              name: 'register'
            }"
          >
            <span class="font-bold text-primary text-xl"> Registrate </span>
          </RouterLink>
        </p>
      </template>
    </Card>
  </main>
</template>
