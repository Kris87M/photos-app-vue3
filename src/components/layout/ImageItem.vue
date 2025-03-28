<template>
  <img
    :src="imageSrc"
    class="image h-25rem shadow-4">
</template>

<script>
import { imagesUrl } from '@/config'

export default {
  name: 'PhotosList',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    imageSrc () {
      return `${imagesUrl}/${this.src}`
    }
  }
}
</script>

<style lang="scss">
.image {
  object-fit: cover;
}
</style>
