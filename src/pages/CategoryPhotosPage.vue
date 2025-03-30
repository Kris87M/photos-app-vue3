<template>
  <h1 class="category-page">
    <page-title>
      <p class="text-left ml-4">{{pageTitle}}</p>
    </page-title>
    <photos-catalog :category="this.category"/>
    <router-view />
  </h1>
</template>

<script>
import PhotosCatalog from '@/components/features/PhotosCatalog.vue'
import PageTitle from '@/components/layout/PageTitle.vue'

export default {
  name: 'CategoryPhotosPage',
  components: { PageTitle, PhotosCatalog },
  computed: {
    category () {
      return this.$route.params.category
    },
    pageTitle () {
      return `${this.$route.params.category.charAt(0).toUpperCase() + this.$route.params.category.slice(1)} photos`
    }
  }
}
</script>
