<script lang="ts">
import Header from "../components/Header.vue";
import LoginModal from "../components/LoginModal.vue";
import Hero from "../components/Hero.vue";
import CardsContainer from "../components/CardsContainer.vue";
import Card from "../components/Card.vue";
import { ref } from "vue";

export default {
  components: {
    Header,
    LoginModal,
    Hero,
    CardsContainer,
    Card,
  },
  mounted() {
    fetch("src/data.json")
      .then((res) => res.json())
      .then((data) => (this.cards = data));
  },
  setup() {
    const showModal = ref(false);
    const auth = ref(false);
    function toggleModal() {
      window.scrollTo(0, 0);
      showModal.value = !showModal.value;
      showModal.value
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "initial");
      localStorage.setItem("auth", "true");
      auth.value = true;
    }

    return { showModal, toggleModal, auth };
  },
  data() {
    return {
      cards: [],
      proteinPlates: "Protein plates",
    };
  },
};
</script>

<template>
  <main class="content">
    <Header :auth="auth" @openModal="toggleModal" />
    <Hero />
    <CardsContainer :title="proteinPlates" :cards="cards" />
  </main>
  <LoginModal @closeModal="toggleModal" :isActive="showModal" />
</template>

<style lang="scss">
@import "../assets/blocks/content/content.scss";
</style>
