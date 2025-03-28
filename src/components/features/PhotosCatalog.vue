<template>
  <div class="photos-list-container">
    <div class="photos-list" ref="catalog">
      <photos-list :photos="photos" @vote="handleVote"/>
    </div>
    <div
      class="loader"
      v-show="request.pending">
      <progress-spinner />
    </div>
    <div
      class="error"
      v-show="request.error">
      <Message severity="error" variant="outlined">Error! Cannot connect to server! Try again later!</Message>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PhotosList from '../shared/PhotosList.vue'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'

export default {
  name: 'PhotosCatalog',
  components: { Message, PhotosList, ProgressSpinner },
  data: () => ({
    currentPage: 1
  }),
  props: {
    category: {
      type: String
    }
  },
  computed: {
    ...mapState('Photos', ['photos', 'request'])
  },
  methods: {
    ...mapActions('Photos', ['addVote', 'fetchPhotos', 'fetchCategory']),
    handleVote (id) {
      this.addVote(id)
    },
    async loadPhotos () {
      this.currentPage++
      if (!this.category) this.fetchPhotos(this.currentPage)
      else this.fetchCategory({ category: this.category, page: this.currentPage })
    },
    handleScroll () {
      const elem = this.$refs.catalog
      const bottomOfWindow = Math.ceil(elem.scrollTop) >= (elem.scrollHeight - elem.offsetHeight)
      if (bottomOfWindow) this.loadPhotos()
    },
    prepareScroll () {
      this.$refs.catalog.addEventListener('scroll', () => { this.handleScroll() })
    }
  },
  created () {
    if (!this.category) this.fetchPhotos(1)
    else this.fetchCategory({ category: this.category, page: 1 })
  },
  mounted () {
    this.prepareScroll()
  }
}
</script>

<style lang="scss" scoped>
.photos-list-container {
  position: relative;
}
.photos-list {
  max-height: 1200px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: 10px;
}
.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
}
</style>
