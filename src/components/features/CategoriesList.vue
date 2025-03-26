<template>
  <ul class="flex gap-2">
    <Button rounded raised outlined
    v-for="category in categories"
    :key="category.id"
    :label="category.name" />
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
