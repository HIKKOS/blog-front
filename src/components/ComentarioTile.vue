<script>
export default {
  name: 'UserTile',
  props: ['name', 'photo', 'text', 'date'],
  computed: {
    formatedDate() {
      const date = new Date(this.date).toDateString()
      return date.split(' ').slice(2).join('/')
    }
  }
}
</script>

<template>
  <div class="flex flex-row items-center">
    <Avatar v-if="photo" :image="photo" />
    <Avatar v-else icon="pi pi-user" />

    <div class="pl-2 flex flex-col w-full">
      <div class="flex flex-row w-full justify-between items-baseline">
        <h2 class="text-xl pr-2">{{ name }}</h2>
        <p>{{ formatedDate }}</p>
      </div>
      <p class="pt-1 text-lg font-normal">{{ text }}</p>
    </div>
  </div>
</template>
