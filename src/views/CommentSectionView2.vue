<script setup>
import PostComponent from '@/components/PostComponent.vue'
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'
import Textarea from 'primevue/textarea'
import ComentarioTile from '@/components/ComentarioTile.vue'
import ProgressSpinner from 'primevue/progressspinner'
import axios from 'axios'
import server from '@/config/consts'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const post = ref()
const comentario = ref('')
const posting = ref(false)
const route = useRoute()
const loading = ref(true)
const userPhoto = JSON.parse(localStorage.getItem('user')).user.photo
const getPost = async (id) => {
  try {
    const response = await axios.get(`${server}/posts/${id}`)
    post.value = response.data
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  const id = route.params.id
  console.log(id)
  await getPost(id)
  loading.value = false
})
const comment = async () => {
  posting.value = true
  const id = route.params.id
  const data = {
    content: comentario.value,
    postId: id,
    authorId: JSON.parse(localStorage.getItem('user')).user.id
  }

  try {
    const res = await axios.put(`${server}/posts/${id}`, data)
    if (res.status === 200) {
      await getPost(id)
      posting.value = false
      comentario.value = ''
    } else {
      posting.value = false
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <div v-if="post" class="w-full flex-row flex justify-center items-start">
    <PostComponent
      :image="post.image"
      :title="post.title"
      :content="post.content"
      :user="post.author"
      :date="post.createdAt"
    />
    <div class="p-2 w-full flex-col flex">
      <Card>
        <template #title>
          <h1 class="text-2xl pb-3 font-bold">Comentarios</h1>
          <div class="flex flex-row items-center justify-start justify-items-center">
            <Avatar v-if="userPhoto" :image="userPhoto" />
            <Avatar v-else icon="pi pi-user" />

            <Textarea
              v-model="comentario"
              class="w-full mx-2"
              placeholder="Escribe algo"
            ></Textarea>
            <Button
              v-if="!posting"
              @click="comment"
              icon="pi pi-send"
              class="w-40 h-16"
              label="Comentar"
              :disabled="!comentario"
            ></Button>
            <ProgressSpinner v-else class="w-40 h-16" />
          </div>
        </template>
        <template #content>
          <div class="flex flex-col">
            <ComentarioTile
              class="py-2"
              v-for="comment in post.comments"
              :key="comment.id"
              :photo="comment.author.photo"
              :date="comment.createdAt"
              :name="comment.author.name"
              :text="comment.content"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
  <div v-else class="w-full flex-col flex justify-center items-center">
    <Skeleton height="40rem" width="40rem" borderRadius="16px" />
  </div>
</template>

<style></style>
