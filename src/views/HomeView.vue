<script setup>
import PostComponentHome from '@/components/PostComponentHome.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import server from '@/config/consts'
const posts = ref()
const error = ref(null)

onMounted(() => {
  getPosts()
})

const getPosts = async () => {
  try {
    const response = await axios.get(`${server}/posts`)
    console.log(response.data)
    posts.value = response.data
  } catch (error) {
    error.value = error
    console.error(error)
  }
}
</script>
<template>
  <main class="flex flex-col items-center">
    <div v-if="!posts">
      <div v-for="n in 3" :key="n" class="mt-4">
        <Skeleton height="40rem" width="40rem" borderRadius="16px"></Skeleton>
      </div>
    </div>
    <div v-else-if="error">
      <h1 class="text-2xl font-bold text-red-500">Error: {{ error }}</h1>
    </div>
    <PostComponentHome v-else v-for="post in posts" :key="post.id" :post="post" />
  </main>
</template>
