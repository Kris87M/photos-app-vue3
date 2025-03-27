<template>
  <photos-list :photos="photos"/>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PhotosList from '../shared/PhotosList.vue'

export default {
  name: 'PhotosCatalog',
  components: { PhotosList },
  props: {
    category: {
      type: String
    }
  },
  computed: {
    ...mapState(['photos'])
  },
  methods: {
    ...mapActions(['fetchPhotos', 'fetchCategoryPhotos'])
  },
  created () {
    if (!this.category) this.fetchPhotos(1)
    else this.fetchCategoryPhotos({ category: this.category, page: 1 })
  }
}
</script>
