<script lang="ts">
export default {
  methods: {
    openModal() {
      this.$emit("openModal");
    },
  },
  props: ["auth"],
};
</script>

<template>
  <header class="header">
    <a href="/" class="header__homepage-link">sweetgreen</a>
    <button v-if="!auth" @click="openModal" href="" class="header__login-link">
      Log in
    </button>
  </header>
</template>

<style lang="scss">
@import "../assets/global.scss";
@import "../assets/blocks/header/header.scss";
</style>
