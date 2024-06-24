<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import Card from 'primevue/card'
import UserTile from './UserTile.vue'

const size = {
  width: 100,
  height: 100
}
export default {
  name: 'PostComponent',
  props: ['image', 'title', 'content', 'user', 'date'],
  components: {
    Card,
    UserTile
  },
  setup() {
    return {
      size
    }
  }
}
</script>
<template>
  <Card class="m-2 w-full">
    <template #title>
      <UserTile :name="user.name" :date="date" />
    </template>
    <template #content>
      <img class="w-fit" :height="size.height" :width="size.width" :src="image" alt="ola" />
      <p class="py-4 text-xl">{{ content }}</p>
    </template>
  </Card>
</template>
