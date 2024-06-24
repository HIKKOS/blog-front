<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import axios from 'axios'
import server from '@/config/consts'
const router = useRouter()
const toast = useToast()
const username = ref('')
const password = ref('')
const isRegistering = ref(false)
const showError = () => {
  toast.add({ severity: 'error', summary: 'Error', detail: 'algo salio mal', life: 3000 })
}
const showSuccess = () => {
  toast.add({ severity: 'success', summary: 'Exito', detail: 'Usuario registrado', life: 3000 })
}
const goToLogin = () => {
  router.push({ name: 'login' })
}
const register = async () => {
  try {
    isRegistering.value = true
    const response = await axios.post(`${server}/users`, {
      email: username.value,
      name: name.value,
      password: password.value
    })
    if (response.status === 200) {
      showSuccess()
      goToLogin()
    } else {
      showError()
    }
  } catch (error) {
    console.error(error)
    showError()
  } finally {
    isRegistering.value = false
  }
}
const name = ref('')
</script>
<template>
  <Toast />
  <main class="flex justify-center items-center flex-grow">
    <Card class="w-96">
      <template #title>
        <h1 class="text-center font-bold text-4xl">FakeBlog</h1>
        <h2 class="py-2 text-center text-2xl">Registro</h2>
      </template>
      <template #content>
        <form class="flex flex-col space-y-4">
          <label for="username" class="text-xl font-semibold">Correo</label>
          <InputText name="username" v-model="username" placeholder="Correo" />
          <label for="name" class="text-xl font-semibold">Nombre de usario</label>
          <InputText name="name" v-model="name" placeholder="Nombre de usuario" />
          <label for="password" class="text-xl font-semibold">Contraseña</label>
          <InputText name="password" v-model="password" placeholder="Contraseña" type="password" />

          <Divider />
          <Button
            v-if="!isRegistering"
            :disabled="!username || !password || !name"
            @click="register"
            >Registrarse</Button
          >
          <Button v-else disabled>Registrando...</Button>
        </form>
      </template>
    </Card>
  </main>
</template>
