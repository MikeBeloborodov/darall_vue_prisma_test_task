<script lang="ts">
import Card from "./Card.vue";
export default {
  components: {
    Card,
  },
  props: ["cards", "title"],
};
</script>

<template>
  <div class="cards-container">
    <h2 class="cards-container__title">{{ title }}</h2>
    <ul class="cards-container__list">
      <li v-for="card in cards" class="cards-container__item">
        <Card :card="card" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import "../assets/blocks/cards-container/cards-container.scss";
</style>
