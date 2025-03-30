<template>
  <h1 class="home-page">
    <page-title>
      <p class="text-left ml-4">Photos</p>
    </page-title>
    <photos-catalog />
    <router-view />
  </h1>
</template>

<script>
import PhotosCatalog from '@/components/features/PhotosCatalog.vue'
import PageTitle from '@/components/layout/PageTitle.vue'

export default {
  name: 'HomePage',
  components: { PageTitle, PhotosCatalog }
}
</script>
