<template>
  <div class="flex justify-content-around">
    <p v-if="photos.length === 0" class="alert">
      ⚠️ Brak zdjęć do wyświetlenia!
    </p>
    <photo-summary
      v-for="photo in photos"
      :key="photo.id"
      :title="photo.title"
      :author="photo.author"
      :description="photo.description"
      :src="photo.src"
      :votes="photo.votes"
      :category="photo.category"/>
  </div>
</template>

<script>
import PhotoSummary from './PhotoSummary.vue'

export default {
  name: 'PhotoList',
  components: { PhotoSummary },
  props: {
    photos: {
      type: Array
    }
  }
}
</script>
