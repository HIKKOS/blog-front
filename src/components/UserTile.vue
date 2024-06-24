<script>
export default {
  name: 'UserTile',
  props: ['name', 'date', 'photo'],
  computed: {
    formatedDate() {
      const date = new Date(this.date).toDateString()
      return date.split(' ').slice(2).join('/')
    }
  }
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-row items-center">
      <Avatar v-if="photo" :image="photo" />
      <Avatar v-else icon="pi pi-user" />
      <h2 class="pl-2 text-2xl">{{ name }}</h2>
    </div>
    <p class="py-2 text-xl font-normal">publicado el: {{ formatedDate }}</p>
  </div>
</template>
