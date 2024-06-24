<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import Card from 'primevue/card'
import Button from 'primevue/button'
import UserTile from './UserTile.vue'
import Divider from 'primevue/divider'

const size = {
  width: 100,
  height: 100
}

export default {
  name: 'PostComponent',
  props: ['post'],
  components: {
    Card,
    Divider,
    Button,
    UserTile
  },

  computed: {
    getLink(id) {
      return `/comment/${id}`
    },
    hasComments() {
      return this.post.comments.length > 0
    },
    first2Comments() {
      return this.post.comments.slice(0, 2)
    },
    hasMoreComments() {
      return this.post.comments.length > 2
    }
  },

  setup() {
    return {
      size
    }
  }
}
</script>
<template>
  <Card class="m-2 w-1/3">
    <template #title>
      <UserTile :photo="post.author.photo" :name="post.author.name" :date="post.createdAt" />
    </template>
    <template #content>
      <h2 class="pb-2 text-2xl font-bold">{{ post.title }}</h2>
      <img :src="post.image" alt="ola" />
      <p class="py-4 text-xl">{{ post.content }}</p>
      <Divider />
    </template>
    <template #footer>
      <h2 class="pb-4 text-xl font-semibold">
        {{ hasComments ? 'Comentarios' : 'Sin comentarios' }}
      </h2>
      <ComentarioTile
        class="py-2"
        v-for="comment in first2Comments"
        :date="comment.createdAt"
        :key="comment.id"
        :photo="comment.author.photo"
        :name="comment.author.name"
        :text="comment.content"
      />
      <Button
        @click="
          () => {
            this.$router.push({
              name: 'comment',
              params: { id: post.id }
            })
          }
        "
        text
        v-if="hasMoreComments"
        class="w-full text-2xl"
        label="...más comentarios"
      />

      <Button
        @click="
          () => {
            this.$router.push({
              name: 'comment',
              params: { id: post.id }
            })
          }
        "
        class="w-full"
        icon="pi pi-send"
        label="Commentar"
      >
      </Button>
    </template>
  </Card>
</template>
