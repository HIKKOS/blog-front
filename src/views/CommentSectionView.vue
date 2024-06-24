<script>
import PostComponent from '@/components/PostComponent.vue'
import Card from 'primevue/card'
import Textarea from 'primevue/textarea'
import ComentarioTile from '@/components/ComentarioTile.vue'
import axios from 'axios'
import server from '@/config/consts'

export default {
  name: 'CommentSectionView',
  components: {
    PostComponent,
    Card,
    // eslint-disable-next-line vue/no-reserved-component-names
    Textarea,
    ComentarioTile
  },
  data() {
    return {
      post: null
    }
  },
  mounted() {
    this.getPost()
  },
  options: {
    props: {
      id: {
        type: String,
        required: true
      }
    }
  },
  methods: {
    async getPost() {
      try {
        const response = await axios.get(`${server}/posts/${this.$route.params.id}`)
        this.post = response.data
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  },
  props: ['id']
}
</script>
<template>
  <div class="w-screen flex flex-col items-center">
    <h1 :v-if="!post">no hay post</h1>
    <PostComponent
      :v-else
      :image="post.image"
      :title="post.title"
      :content="post.content"
      :user="post.author"
      :date="post.createdAt"
    />
    <h1 class="text-2xl pb-3 font-bold">Comentarios</h1>
    <Card class="w-1/3">
      <template #title>
        <div class="flex flex-row items-center justify-start justify-items-center">
          <Avatar class="w-1/5" size="large" icon="pi pi-user" />
          <Textarea class="w-full mx-2" placeholder="Escribe algo"></Textarea>
          <Button icon="pi pi-send" class="w-1/5 h-full" label="Comentar"></Button>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col">
          <ComentarioTile
            class="py-2"
            v-for="comment in post.comments"
            :key="comment.id"
            :date="comment.createdAt"
            :name="comment.author.name"
            :text="comment.content"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style></style>
