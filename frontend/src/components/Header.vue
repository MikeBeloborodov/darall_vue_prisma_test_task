<script lang="ts">
export default {
  methods: {
    openLoginModal() {
      this.$emit("openLoginModal");
    },
    openSignupModal() {
      this.$emit("openSignupModal");
    },
  },
  props: [],
};
</script>

<template>
  <header class="header">
    <a href="/" class="header__homepage-link">sweetgreen</a>
    <div class="header__buttons-container">
      <button @click="openSignupModal" class="header__login-link">
        Sign up
      </button>
      <button @click="openLoginModal" class="header__login-link">Log in</button>
    </div>
  </header>
</template>

<style lang="scss">
@import "../assets/global.scss";
@import "../assets/blocks/header/header.scss";
</style>
