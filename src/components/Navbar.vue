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
          <button type="button" class="btn btn-success" @click="openModal">
            Filters
          </button>
        </div>
      </div>
    </nav>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Filters For Product
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body d-flex flex-column">
            <label>Category:</label>
            <select v-model="localFilters.category" class="form-control">
              <option value="All">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
            </select>

            <label>Price Range: {{ localFilters.priceRange }}</label>
            <input
              type="range"
              class="form-range"
              v-model="localFilters.priceRange"
              min="0"
              max="500"
              step="10"
            />

            <label>Rating:</label>
            <select v-model="localFilters.rating" class="form-control">
              <option value="0">All</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>

            <label>Sort:</label>
            <select v-model="localSortOption" class="form-control">
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="applyFilters">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <ProductList />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProductList from "./ProductList.vue";
import { Modal } from "bootstrap";
import loader from "@/assets/loader.vue";
export default {
  name: "FilterModal",
  components: {
    ProductList,
    loader,
  },
  data() {
    return {
      modalInstance: null,
      localFilters: {},
      localSortOption: "",
    };
  },
  computed: {
    ...mapState(["filters", "sortOption"]),
  },
  mounted() {
    this.modalInstance = new Modal(document.getElementById("exampleModal"));
    this.localFilters = { ...this.filters };
    this.localSortOption = this.sortOption;
  },
  methods: {
    ...mapActions(["updateFilter", "updateSortOption", "logout"]),
    openModal() {
      this.modalInstance.show();
    },
    closeModal() {
      this.modalInstance.hide();
    },
    applyFilters() {
      this.updateFilter({ key: "category", value: this.localFilters.category });
      this.updateFilter({
        key: "priceRange",
        value: this.localFilters.priceRange,
      });
      this.updateFilter({ key: "rating", value: this.localFilters.rating });
      this.updateSortOption(this.localSortOption);
      this.modalInstance.hide();
    },
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
