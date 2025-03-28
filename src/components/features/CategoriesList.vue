<template>
  <ul class="flex gap-2">
    <router-link
      v-for="category in categories"
      :key="category.id"
      :to="`/photos/${category.name}`">
      <Button rounded raised outlined :label="category.name" />
    </router-link>
  </ul>

</template>

<script>
import { mapState } from 'vuex'
import Button from 'primevue/button'

export default {
  name: 'CategoriesList',
  components: { Button },
  computed: {
    ...mapState(['categories'])
  }
}
</script>
