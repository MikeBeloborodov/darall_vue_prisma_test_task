<script lang="ts">
import axios from "axios";
import { ref } from "vue";
import { sleep } from "../helpers/helpers";
export default {
  props: ["isActive"],
  emits: ["closeSignupModal"],
  methods: {
    async signupUser() {
      this.loading = true;
      await sleep(1000);
      axios({
        method: "post",
        url: "http://localhost:8080/api/v1/user/signup",
        data: {
          email: this.email,
          password: this.password1,
        },
      })
        .then((res) => {
          console.log(res);
          this.$emit("closeSignupModal");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    closeSignupModal() {
      this.email = "";
      this.password1 = "";
      this.password2 = "";
      this.emailError = "";
      this.password1Error = "";
      this.password2Error = "";
      this.passwordsMatch = false;
      this.emailValid = false;
      this.password1Valid = false;
      this.password2Valid = false;
      this.$emit("closeSignupModal");
    },
    validateInput() {
      if (
        (this.emailValid,
        this.password1Valid,
        this.password2Valid,
        this.passwordsMatch)
      ) {
        this.buttonDisabled = false;
      } else {
        this.buttonDisabled = true;
      }
    },
    validateEmail(value: string) {
      if (value === "") {
        this.password1Valid = false;
        this.password1Error = "";
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
    validatePassword1(value: string) {
      if (value === "") {
        this.password1Valid = false;
        this.password1Error = "";
        this.validateInput();
        return;
      } else if (/[\da-zA-z@\.!#\$%\^\&\*]+$/.test(value)) {
        this.password1Valid = true;
        this.password1Error = "";
        this.validateInput();
        return;
      } else {
        this.password1Valid = false;
        this.password1Error = "Please enter a valid password.";
        this.validateInput();
      }
    },
    validatePassword2(value: string) {
      if (value === "") {
        this.password2Valid = false;
        this.password2Error = "";
        this.validateInput();
        return;
      } else if (this.password1 === this.password2) {
        this.password2Error = "";
        this.password2Valid = true;
        this.passwordsMatch = true;
        this.validateInput();
        return;
      } else {
        this.password2Valid = false;
        this.password2Error = "Passwords do not match.";
        this.validateInput();
      }
    },
  },
  watch: {
    email(value) {
      this.email = value;
      this.validateEmail(value);
    },
    password1(value) {
      this.password1 = value;
      this.validatePassword1(value);
    },
    password2(value) {
      this.password2 = value;
      this.validatePassword2(value);
    },
  },
  data() {
    return {
      email: "",
      emailValid: false,
      emailError: "",
      password1: "",
      password1Valid: false,
      password1Error: "",
      password2: "",
      password2Error: "",
      password2Valid: false,
      passwordsMatch: false,
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
    @click="closeSignupModal"
  >
    <form class="auth-modal__form" @submit.prevent v-on:click.stop>
      <button @click="closeSignupModal" class="auth-modal__close-btn"></button>
      <div class="auth-modal__input-container">
        <label for="email" class="auth-modal__label">Email</label>
        <input
          id="signup-email"
          name="email"
          type="email"
          :class="{ 'auth-modal__input_error': emailError }"
          class="auth-modal__input"
          placeholder="example@email.com"
          v-on:input="validateInput"
          v-model="email"
        />
        <span class="auth-modal__error">{{ emailError }}</span>
      </div>
      <div class="auth-modal__input-container">
        <label for="password" class="auth-modal__label">Password</label>
        <input
          id="signup-password-1"
          name="password"
          type="password"
          class="auth-modal__input"
          :class="{ 'auth-modal__input_error': password1Error }"
          placeholder="************"
          v-model="password1"
        />
        <span class="auth-modal__error">{{ password1Error }}</span>
      </div>
      <div class="auth-modal__input-container">
        <label for="password" class="auth-modal__label">Confirm password</label>
        <input
          id="signup-password-2"
          name="password"
          type="password"
          class="auth-modal__input"
          :class="{ 'auth-modal__input_error': password2Error }"
          placeholder="************"
          v-model="password2"
        />
        <span class="auth-modal__error">{{ password2Error }}</span>
        <span class="auth-modal__error"></span>
      </div>
      <button
        :class="{ 'auth-modal__submit-btn_disabled': buttonDisabled }"
        @click="signupUser"
        class="auth-modal__submit-btn"
        type="submit"
      >
        Sign up
      </button>
    </form>
  </div>
</template>

<style lang="scss">
@import "../assets/global.scss";
@import "../assets/blocks/auth-modal/auth-modal.scss";
@import "../assets/blocks/spinner/spinner.scss";
.auth-modal__close-btn {
  background-image: url("../assets/svg/close.svg");
}
</style>
