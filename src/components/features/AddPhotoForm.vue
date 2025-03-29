<template>
  <form class="grid" @submit.prevent="handleSubmit">
    <div class="col">

      <!-- msg-success -->
      <Message v-if="isSuccess" severity="success">Success! Your photo has been submitted</Message>

      <!-- msg-error -->
      <Message v-if="isError" severity="error">Oops… something went wrong…</Message>

      <!-- title -->
      <div class="field">
        <label class="block">Title</label>
        <InputText
          type="text"
          v-model="form.title" />
      </div>

      <!-- author -->
      <div class="field">
        <label class="p-d block">Author</label>
        <InputText
          type="text"
          v-model="form.author" />
      </div>

      <!-- category -->
      <div class="field">
        <label class="block">Category</label>
        <Listbox
          v-model="form.category"
          :options="categories"
          optionLabel="name" />
      </div>

      <!-- description -->
      <div class="field">
        <label class="block">Description</label>
        <Textarea
          rows="5"
          cols="30"
          v-model="form.description" />
      </div>

      <Button
        rounded raised
        severity="success"
        type="submit"
        label="Add"
        icon="pi pi-plus" />

    </div>
      <div class="col">
        <image-upload @choose="handleImageChoose"/>
      </div>
  </form>
</template>

<script>
import axios from 'axios'
import { apiUrl } from '@/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Listbox from 'primevue/listbox'
import Message from 'primevue/message'
import Textarea from 'primevue/textarea'
import ImageUpload from '../shared/ImageUpload.vue'
import { mapState } from 'vuex'

export default {
  name: 'AddPhotoForm',
  components: { Button, InputText, ImageUpload, Listbox, Message, Textarea },
  data: () => ({
    form: {
      title: '',
      author: '',
      description: '',
      category: '',
      file: null
    },
    isSuccess: false,
    isError: false
  }),
  computed: {
    ...mapState('Categories', ['categories'])
  },
  methods: {
    handleImageChoose (file) {
      this.form.file = file
      console.log(this.form)
    },
    async handleSubmit () {
      this.isSuccess = false
      this.isError = false

      const formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('author', this.form.author)
      formData.append('description', this.form.description)
      formData.append('category', this.form.category.name)
      formData.append('file', this.form.file)

      const res = await axios.post(`${apiUrl}/photos`, formData, {
        'Content-Type': 'multipart/form-data'
      })
      if (res.status === 200) {
        this.isSuccess = true
      } else {
        this.isError = true
      }
      this.form = {
        title: '',
        author: '',
        description: '',
        category: '',
        file: null
      }
    }
  }
}
</script>
