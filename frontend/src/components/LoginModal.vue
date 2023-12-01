<script setup lang="ts">
const props = defineProps(["isActive"]);
</script>

<template>
  <div
    class="login-modal"
    :class="{ 'login-modal_active': props.isActive }"
    @click="$emit('closeModal')"
  >
    <form class="login-modal__form" @submit.prevent v-on:click.stop>
      <button
        @click="$emit('closeModal')"
        class="login-modal__close-btn"
      ></button>
      <div class="login-modal__input-container">
        <label for="email" class="login-modal__label">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          class="login-modal__input"
          placeholder="example@email.com"
        />
      </div>
      <div class="login-modal__input-container">
        <label for="password" class="login-modal__label">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          class="login-modal__input"
          placeholder="************"
        />
      </div>
      <button class="login-modal__submit-btn" type="submit">Login</button>
    </form>
  </div>
</template>

<style lang="scss">
@import "../assets/global.scss";
@import "../assets/blocks/login-modal/login-modal.scss";
.login-modal__close-btn {
  background-image: url("../assets/svg/close.svg");
}
</style>
