<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'
import Avatar from 'primevue/avatar'
import { RouterLink } from 'vue-router'
import AddPostDialog from '@/components/AddPostDialog.vue'
const isModalVisible = ref(false)
const photo = ref(JSON.parse(localStorage.getItem('user')).user.photo)
const openModal = () => (isModalVisible.value = true)
</script>
<template>
  <nav class="w-screen duration-75">
    <Card>
      <template #title>
        <div class="flex flex-row justify-between">
          <RouterLink class="w-full" :to="{ name: 'home' }">
            <h2 class="text-3xl w-full py-2 text-primary hover:cursor-pointer">FakeBlog</h2>
          </RouterLink>
          <Button v-if="!($route.name !== 'home')" label="Show" @click="openModal">
            <i class="pi pi-plus text-white"></i>
            <p class="text-white font-bold text-xl">Postear</p>
          </Button>

          <Button text>
            <i class="pi pi-ellipsis-v"></i>
          </Button>
          <Avatar v-if="photo" :image="photo" class="mr-2" size="xlarge" shape="circle" />

          <Avatar v-else size="xlarge" icon="pi pi-user" />
        </div>
      </template>
    </Card>

    <div class="card flex justify-center">
      <Dialog :closable="false" class="w-1/3" modal v-model:visible="isModalVisible">
        <template #container="{ closeCallback }">
          <AddPostDialog :closeCallback="closeCallback" />
        </template>
      </Dialog>
    </div>
  </nav>
</template>
