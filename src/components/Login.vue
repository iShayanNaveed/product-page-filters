<template>
  <div>
    <div class="wrapper">
      <div class="card-switch">
        <label class="switch">
          <input type="checkbox" class="toggle" />
          <span class="slider"></span>
          <span class="card-side"></span>
          <div class="flip-card__inner">
            <div class="flip-card__front">
              <div class="title">Log in</div>
              <form
                class="flip-card__form"
                action=""
                @submit.prevent="handleLogin"
              >
                <input
                  class="flip-card__input"
                  name="email"
                  placeholder="Email"
                  type="email"
                  v-model="email"
                />
                <input
                  class="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  v-model="password"
                />
                <button class="flip-card__btn">
                  <span v-if="!$store.state.loading">Let's Go!</span>
                  <loader v-else></loader>
                </button>
                <button
                  type="button"
                  class="flip-card__btn w-100 mt-0"
                  @click="signinwithgoogle"
                >
                  <img
                    src="../assets/google.png"
                    width="20px"
                    v-if="!$store.state.isLoading"
                  />

                  <span v-if="!$store.state.isLoading"
                    >Sign in with google</span
                  >
                  <loader v-else></loader>
                </button>
              </form>
            </div>
            <div class="flip-card__back">
              <div class="title">Sign up</div>
              <form
                class="flip-card__form"
                action=""
                @submit.prevent="handleSignup"
              >
                <input
                  class="flip-card__input"
                  placeholder="Name"
                  type="name"
                  v-model="name"
                />
                <input
                  class="flip-card__input"
                  name="email"
                  placeholder="Email"
                  type="email"
                  v-model="email"
                />
                <input
                  class="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  v-model="password"
                />
                <button class="flip-card__btn">
                  <span v-if="!$store.state.loading">Confirm!</span>
                  <loader v-else></loader>
                </button>

                <button
                  type="button"
                  class="flip-card__btn w-100 mt-0"
                  @click="signupwithgoogle"
                >
                  <img
                    src="../assets/google.png"
                    width="20px"
                    v-if="!$store.state.isLoading"
                  />
                  <span v-if="!$store.state.isLoading"
                    >Sign in with google</span
                  >
                  <loader v-else></loader>
                </button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import loader from "@/assets/loader.vue";
export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
    };
  },
  components: {
    loader,
  },
  methods: {
    ...mapActions(["signup", "login", "signinWithGoogle", "signupWithGoogle"]),
    async handleSignup() {
      try {
        await this.signup({ email: this.email, password: this.password });
        this.$router.push("/");
      } catch (error) {
        alert("Error signing up!");
      }
    },
    async handleLogin() {
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push("/");
      } catch (error) {
        alert("Error logging in!");
      }
    },
    async signinwithgoogle() {
      try {
        await this.signinWithGoogle();
        this.$router.push("/");
      } catch (error) {
        alert("Error signing in with Google: " + error.message);
      }
    },
    async signupwithgoogle() {
      try {
        await this.signupWithGoogle();
        this.$router.push("/");
      } catch (error) {
        alert("Error signing up with Google: " + error.message);
      }
    },
  },
};
</script>
<style></style>
