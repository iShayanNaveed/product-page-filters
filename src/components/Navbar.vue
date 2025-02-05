<template>
  <div class="hello">
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Product Page</a>
        <div>
          <button class="btn btn-success me-2" @click="handleLogout">
            <span v-if="!$store.state.loading">Logout</span>
            <loader v-else></loader>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import loader from "@/assets/loader.vue";
export default {
  name: "FilterModal",
  components: {
    loader,
  },
  data() {
    return {};
  },

  methods: {
    ...mapActions(["logout"]),

    async handleLogout() {
      try {
        await this.logout().then(() => {
          if (this.$route.name !== "login") {
            this.$router.push("/login");
          }
        });
      } catch (error) {
        alert("Error logging in!");
      }
    },
  },
};
</script>

<style scoped></style>
