<template>
  <div>
    <transition name="slide">
      <div
        class="sidebar d-flex flex-column justify-content-center"
        v-if="isSidebarOpen"
      >
        <div class="sidebar-header">
          <h4>Filters</h4>
          <button
            class="btn-close focus-ring focus-ring-success"
            @click="toggleSidebar"
          ></button>
        </div>

        <div class="sidebar-body">
          <label for="category">Category:</label>
          <select
            id="category"
            v-model="localFilters.category"
            class="form-control"
          >
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
          </select>

          <label for="priceRange"
            >Price Range: {{ localFilters.priceRange }}</label
          >
          <input
            type="range"
            id="priceRange"
            class="form-range"
            v-model="localFilters.priceRange"
            min="0"
            max="500"
            step="10"
          />

          <label for="rating">Rating:</label>
          <select
            id="rating"
            v-model="localFilters.rating"
            class="form-control"
          >
            <option value="0">All</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>

          <label for="sort">Sort:</label>
          <select id="sort" v-model="localSortOption" class="form-control">
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
          <button class="btn btn-success" @click="applyFilters">
            Save changes
          </button>
          <button class="btn btn-secondary" @click="resetFilters">
            Reset Filters
          </button>
        </div>
      </div>
    </transition>
    <div v-if="!isSidebarOpen" class="sidebar-toggle" @click="toggleSidebar">
      <toogleSidebar />
    </div>
  </div>
</template>

<script>
import toogleSidebar from "@/assets/toogleSidebar.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "Sidebar",
  components: {
    toogleSidebar,
  },
  data() {
    return {
      localFilters: {},
      localSortOption: "",
    };
  },
  computed: {
    ...mapState(["filters", "sortOption", "isSidebarOpen"]),
  },
  mounted() {
    this.localFilters = { ...this.filters };
    this.localSortOption = this.sortOption;
  },
  methods: {
    ...mapActions(["updateFilter", "updateSortOption", "toggleSidebar"]),
    applyFilters() {
      this.updateFilter({ key: "category", value: this.localFilters.category });
      this.updateFilter({
        key: "priceRange",
        value: this.localFilters.priceRange,
      });
      this.updateFilter({ key: "rating", value: this.localFilters.rating });
      this.updateSortOption(this.localSortOption);
    },
    resetFilters() {
      this.localFilters = {
        category: "All",
        priceRange: 500,
        rating: 0,
      };
      this.localSortOption = "price";
      this.applyFilters();
    },
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #f8f9fa;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  z-index: 1;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-body {
  margin-top: 3rem;
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

@media (max-width: 992px) {
  .sidebar {
    width: 200px;
  }
}
</style>
