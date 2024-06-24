<script>
import InputText from 'primevue/inputtext'
import FileUpload from 'primevue/fileupload'
import { ref } from 'vue'
import axios from 'axios'
import server from '@/config/consts'
const post = ref({
  title: '',
  content: '',
  authorId: JSON.parse(localStorage.getItem('user')).user.id,
  photo: null
})

export default {
  props: {
    closeCallback: Function
  },
  components: {
    InputText,
    FileUpload
  },
  data() {
    return {
      post
    }
  },
  methods: {
    onAdvancedUpload(fileupload) {
      console.log(fileupload)
    },
    onSelect(event) {
      console.log(event)

      post.value.image = event.files[0]
    },
    onClear() {
      console.log('clear')
    },
    async postPost() {
      try {
        const response = await axios.post(`${server}/posts`, post.value)
        const fromData = new FormData()
        fromData.append('image', post.value.image)

        console.log(response)

        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<template>
  <div class="p-4 flex flex-col">
    <h2 class="pb-4 text-2xl font-bold">Nuevo post</h2>
    <label for="title" class="pb-2 text-xl font-semibold">Título</label>
    <InputText v-model="post.title" type="text" placeholder="Título" />
    <label for="content" class="py-2 text-xl font-semibold">Contenido</label>
    <InputText v-model="post.content" placeholder="Contenido" type="text" />
    <br />

    <template>
      <div class="card flex flex-col gap-6 items-center justify-center">
        <Toast />
        <FileUpload
          :ref="fileupload"
          name="demo[]"
          url="/api/upload"
          accept="image/*"
          :maxFileSize="1000000"
        />
        <Button label="Upload" @click="upload" severity="secondary" />
      </div>
    </template>

    <FileUpload
      @select="onSelect"
      @clear="onClear"
      name="demo[]"
      accept="image/*"
      :multiple="false"
      :file-limit="1"
      :maxFileSize="1000000"
      :choose-label="'Seleccionar'"
      :upload-label="'Subir'"
      :showUploadButton="false"
      :cancel-label="'Cancelar'"
      :choose-icon="'pi pi-fw pi-image'"
      :show-cancel-button="false"
      invalid-file-limit-message="Solo se permite un archivo."
    >
      <template #empty>
        <div class="flex-col flex justify-center items-center">
          <i style="font-size: 6rem" class="mb-2 pi pi-cloud-upload" />
          <span>Arrastra una imagen para agregarla al post</span>
        </div>
      </template>
    </FileUpload>
    <div class="flex flex-row gap-2 mt-2">
      <Button
        class="w-full"
        severity="secondary"
        label="Close"
        @click="
          ($event) => {
            post.value = {
              title: '',
              body: '',
              image: null
            }

            closeCallback()
          }
        "
      />
      <Button class="w-full" label="Postear" @click="postPost" />
    </div>
  </div>
</template>
