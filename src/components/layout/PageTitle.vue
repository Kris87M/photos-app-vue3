<template>
  <h2 class="page-title">
    <slot />
  </h2>
</template>

<script>
export default {
  name: 'PageTitle'
}
</script>

<style lang="scss">
.page-title {
  font-size: 18px;
}
</style>
