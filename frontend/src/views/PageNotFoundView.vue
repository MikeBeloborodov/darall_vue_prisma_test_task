<script lang="ts">
export default {};
</script>

<template>
  <div class="page-not-found">
    <h1 class="page-not-found__text">Page not found</h1>
    <p class="page-not-found__status">404</p>
    <router-link to="/menu" class="page-not-found__link"
      >Back to menu</router-link
    >
  </div>
</template>

<style lang="scss">
@import "../assets/blocks/page-not-found/page-not-found.scss";
</style>
