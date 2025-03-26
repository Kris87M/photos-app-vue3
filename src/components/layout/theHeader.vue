<template>
  <header >
    <div class="header flex justify-content-between flex-wrap m-4">
      <h3>
        <router-link
          to="/"
          class="no-underline text-color hover:text-blue-700">
          PhotosApp
        </router-link> |
        <span class="text-sm font-normal">share your moments</span>
      </h3>
      <Button label="Submit" icon="pi pi-plus" rounded raised/>
    </div>
    <categories-list class="m-4 pt-4 border-top-1 border-gray-500"/>
  </header>
</template>

<script>
import Button from 'primevue/button'
import CategoriesList from '../features/CategoriesList.vue'

export default {
  name: 'AppHeader',
  components: { Button, CategoriesList }
}
</script>
