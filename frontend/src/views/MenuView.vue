<script lang="ts">
import Header from "../components/Header.vue";
import LoginModal from "../components/LoginModal.vue";
import Hero from "../components/Hero.vue";
import CardsContainer from "../components/CardsContainer.vue";
import Card from "../components/Card.vue";
import SignUpModal from "../components/SignUpModal.vue";
import { ref } from "vue";

export default {
  components: {
    Header,
    LoginModal,
    SignUpModal,
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
    const showLoginModal = ref(false);
    const showSignupModal = ref(false);
    const auth = ref(false);
    function toggleLoginModal() {
      window.scrollTo(0, 0);
      showLoginModal.value = !showLoginModal.value;
      showLoginModal.value
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "initial");
      localStorage.setItem("auth", "true");
      auth.value = true;
    }
    function toggleSignupModal() {
      window.scrollTo(0, 0);
      showSignupModal.value = !showSignupModal.value;
      showSignupModal.value
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "initial");
    }

    return {
      showLoginModal,
      showSignupModal,
      toggleLoginModal,
      toggleSignupModal,
      auth,
    };
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
    <Header
      :auth="auth"
      @openLoginModal="toggleLoginModal"
      @openSignupModal="toggleSignupModal"
    />
    <Hero />
    <CardsContainer :title="proteinPlates" :cards="cards" />
  </main>
  <LoginModal @closeLoginModal="toggleLoginModal" :isActive="showLoginModal" />
  <SignUpModal
    @closeSignupModal="toggleSignupModal"
    :isActive="showSignupModal"
  />
</template>

<style lang="scss">
@import "../assets/blocks/content/content.scss";
</style>
