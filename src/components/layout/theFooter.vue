<template>
  <footer class="footer flex justify-content-between p-2 m-4">
    <p>2020 All rights reserved</p>
    <p>{{`We have ${categoriesAmount} categories!`}}</p>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppFooter',
  computed: {
    ...mapGetters('Categories', ['categoriesAmount'])
  }
}
</script>
