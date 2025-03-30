<template>
  <Form class="formgrid grid" @submit.prevent="handleSubmit" v-slot="{ errors }">
    <div class="field col col-offset-2">

      <!-- msg-success -->
      <Message v-if="isSuccess" severity="success">Success! Your photo has been submitted</Message>

      <!-- msg-error -->
      <Message v-if="isError" severity="error">Oops… something went wrong…</Message>

      <!-- title -->
      <Field class="field" name="title" v-slot="{ field }" rules="required|min:10|max:60">
        <label class="block">Title</label>
        <InputText
          v-bind="field"
          type="text"
          v-model="form.title" />
          <span class="error block text-red-600">{{ errors.title }}</span>
      </Field>

      <!-- author -->
      <Field class="field" name="author" v-slot="{ field }" rules="required|min:3|max:30">
        <label class="block">Author</label>
        <InputText
        v-bind="field"
          type="text"
          v-model="form.author" />
          <span class="error block text-red-600">{{ errors.author }}</span>
      </Field>

      <!-- category -->
      <Field class="field" name="category" v-slot="{ field }" rules="required">
        <label class="block">Category</label>
        <Listbox
        v-bind="field"
          v-model="form.category"
          :options="categories"
          optionLabel="name" />
          <span class="error block text-red-600">{{ errors.category }}</span>
      </Field>

      <!-- description -->
      <Field class="field" name="description" v-slot="{ field }" rules="required|max:100">
        <label class="block">Description</label>
        <Textarea
          v-bind="field"
          rows="5"
          cols="30"
          v-model="form.description" />
          <span class="error block text-red-600">{{ errors.description }}</span>
      </Field>

      <Button
        rounded raised
        severity="success"
        type="submit"
        label="Add"
        icon="pi pi-plus" />

    </div>
      <div class="field col">
        <Field class="p-col" v-slot="{ field }" rules="required|ext:png,jpg" name="image">
          <span class="error block text-red-600">{{ errors.image }}</span>
        <image-upload @choose="handleImageChoose" v-bind="field"/>
        </Field>
      </div>
  </Form>
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
import { Form, Field, defineRule } from 'vee-validate'
import { required, min, max, ext } from '@vee-validate/rules'

defineRule('required', (value) => required(value) || 'This field is so so required...')
defineRule('min', (value, params) => min(value, params) || `It should be longer than ${params}`)
defineRule('max', (value, params) => max(value, params) || `It should be shorter than ${params}`)
defineRule('ext', (value, params) => ext(value, params) || `You should use one of these extensions: ${params}`)

export default {
  name: 'AddPhotoForm',
  components: { Button, InputText, ImageUpload, Listbox, Message, Textarea, Form, Field },
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
