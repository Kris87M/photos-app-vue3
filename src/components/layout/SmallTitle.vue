<template>
  <h3 class="small-title">
    <slot />
  </h3>
</template>

<script>
export default {
  name: 'SmallTitle'
}
</script>

<style lang="scss">
.small-title {
  font-size: 16px;
}
</style>
