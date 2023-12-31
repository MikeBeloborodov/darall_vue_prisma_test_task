<script lang="ts">
import { ref } from "vue";
import axios from "axios";
import { sleep } from "../helpers/helpers";

export default {
  props: ["isActive"],
  emits: ["closeLoginModal"],
  methods: {
    async loginUser() {
      this.loading = true;
      await sleep(1000);
      axios({
        method: "post",
        url: "http://localhost:8080/api/v1/user/login",
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((res) => {
          console.log(res);
          this.$emit("closeLoginModal");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            this.emailError = "Wrong email or password";
          } else {
            this.emailError = "Something wrong with the database.";
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    closeLoginModal() {
      this.email = "";
      this.password = "";
      this.emailError = "";
      this.passwordError = "";
      this.emailValid = false;
      this.passwordValid = false;
      this.$emit("closeLoginModal");
    },
    validateInput() {
      if ((this.emailValid, this.passwordValid)) {
        this.buttonDisabled = false;
      } else {
        this.buttonDisabled = true;
      }
    },
    validateEmail(value: string) {
      if (value === "") {
        this.emailValid = false;
        this.emailError = "";
        this.validateInput();
        return;
      } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.emailValid = true;
        this.emailError = "";
        this.validateInput();
        return;
      } else {
        this.emailValid = false;
        this.emailError = "Please enter a valid email.";
        this.validateInput();
      }
    },
    validatePassword(value: string) {
      if (value === "") {
        this.passwordValid = false;
        this.passwordError = "";
        this.validateInput();
        return;
      } else if (/[\da-zA-z@\.!#\$%\^\&\*]+$/.test(value)) {
        this.passwordValid = true;
        this.passwordError = "";
        this.validateInput();
        return;
      } else {
        this.passwordValid = false;
        this.passwordError = "Please enter a valid password.";
        this.validateInput();
      }
    },
  },
  watch: {
    email(value) {
      this.email = value;
      this.validateEmail(value);
    },
    password(value) {
      this.password = value;
      this.validatePassword(value);
    },
  },
  data() {
    return {
      email: "",
      emailValid: false,
      emailError: "",
      password: "",
      passwordValid: false,
      passwordError: "",
    };
  },
  setup() {
    const buttonDisabled = ref(true);
    const loading = ref(false);

    return { buttonDisabled, loading };
  },
};
</script>

<template>
  <div v-if="loading" class="spinner"></div>
  <div
    class="auth-modal"
    :class="{ 'auth-modal_active': isActive }"
    @click="closeLoginModal"
  >
    <form class="auth-modal__form" @submit.prevent v-on:click.stop>
      <button @click="closeLoginModal" class="auth-modal__close-btn"></button>
      <div class="auth-modal__input-container">
        <label for="email" class="auth-modal__label">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          class="auth-modal__input"
          :class="{ 'auth-modal__input_error': emailError }"
          placeholder="example@email.com"
          v-model="email"
        />
        <span class="auth-modal__error">{{ emailError }}</span>
      </div>
      <div class="auth-modal__input-container">
        <label for="password" class="auth-modal__label">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          class="auth-modal__input"
          :class="{ 'auth-modal__input_error': passwordError }"
          placeholder="************"
          v-model="password"
        />
        <span class="auth-modal__error">{{ passwordError }}</span>
      </div>
      <button
        :class="{ 'auth-modal__submit-btn_disabled': buttonDisabled }"
        @click="loginUser"
        class="auth-modal__submit-btn"
        type="submit"
      >
        Login
      </button>
    </form>
  </div>
</template>

<style lang="scss">
@import "../assets/global.scss";
@import "../assets/blocks/auth-modal/auth-modal.scss";
.auth-modal__close-btn {
  background-image: url("../assets/svg/close.svg");
}
</style>
