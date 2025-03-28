<template>
  <div class="ml-4 grid">
    <div v-for="photo in photos"
    :key="photo.id"
    class="col-12 md:col-6 lg:col-4 xl:col-2 flex">
    <photo-summary
    :title="photo.title"
    :author="photo.author"
    :description="photo.description"
    :src="photo.src"
    :votes="photo.votes"
    :category="photo.category"
    :id="photo._id"
    @vote="onVote(photo._id)"
    />
    </div>
  </div>
  <Message severity="warn" variant="outlined" v-if="photos.length === 0">
    No photos to display!
  </Message>
</template>

<script>
import PhotoSummary from './PhotoSummary.vue'
import Message from 'primevue/message'

export default {
  name: 'PhotoList',
  components: { Message, PhotoSummary },
  props: {
    photos: {
      type: Array
    }
  },
  emits: ['vote'],
  methods: {
    onVote (id) {
      this.$emit('vote', id)
    }
  }
}
</script>

<style scoped>
.grid {
  align-items: stretch;
}
</style>
