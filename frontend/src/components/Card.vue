<script setup lang="ts">
const props = defineProps(["card"]);
</script>

<template>
  <div class="card" :id="card.id">
    <img :src="card.image" :alt="card.title" class="card__image" />
    <h3 class="card__title">{{ card.title }}</h3>
    <p class="card__description">{{ card.description }}</p>
    <div class="card__nutrition-box">
      <p class="card__nutrition-text">
        {{ card.calories }}
        <span class="card__nutrition-title">calories</span>
      </p>
      <p class="card__nutrition-text">
        {{ card.protein }}G
        <span class="card__nutrition-title">protein</span>
      </p>
      <p class="card__nutrition-text">
        {{ card.carbs }}G
        <span class="card__nutrition-title">carbs</span>
      </p>
      <p class="card__nutrition-text">
        {{ card.fat }}G
        <span class="card__nutrition-title">fat</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/blocks/card/card.scss";
</style>
