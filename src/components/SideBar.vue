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

          <label for="priceRange">
            Price Range: {{ min }} -
            {{ max }}
          </label>
          <div class="range_container mx-auto mt-3">
            <div class="sliders_control">
              <input
                id="fromSlider"
                type="range"
                v-model="min"
                min="0"
                max="499"
                @input="validateMin"
              />
              <input
                id="toSlider"
                type="range"
                v-model="max"
                min="min"
                max="500"
                @input="validateMax"
              />
            </div>
          </div>

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
      localFilters: { category: "All", priceRange: [0, 500], rating: 0 },
      localSortOption: "price",
      min: 0,
      max: 500,
    };
  },
  computed: {
    ...mapState(["filters", "sortOption", "isSidebarOpen"]),
  },
  mounted() {
    this.localFilters = JSON.parse(JSON.stringify(this.filters));

    if (!Array.isArray(this.localFilters.priceRange)) {
      this.localFilters.priceRange = [0, 500];
    }
    console.log(this.localFilters, this.filters);

    this.localSortOption = this.sortOption;
    const [priceMin, priceMax] = this.filters.priceRange;
    this.min = priceMin;
    this.max = priceMax;
  },
  methods: {
    ...mapActions(["updateFilter", "updateSortOption", "toggleSidebar"]),
    applyFilters() {
      console.log("Saving Filters:", this.localFilters.priceRange);
      this.updateFilter({ key: "category", value: this.localFilters.category });
      this.updateFilter({
        key: "priceRange",
        value: [this.min, this.max],
      });
      this.updateFilter({ key: "rating", value: this.localFilters.rating });
      this.updateSortOption(this.localSortOption);
    },
    resetFilters() {
      this.localFilters = {
        category: "All",
        // priceRange: [0, 500],
        rating: 0,
      };
      this.min = 0;
      this.max = 500;
      this.localSortOption = "price";
      this.applyFilters();
    },
    validateMin() {
      if (this.min >= this.max) {
        this.min = this.max - 1;
      }
    },
    validateMax() {
      if (this.max <= this.min) {
        this.max = this.min + 1;
      }
    },
  },
  // watch: {
  //   "localFilters.priceRange": {
  //     handler(newValue) {
  //       if (newValue[0] >= newValue[1]) {
  //         this.localFilters.priceRange[0] = newValue[1] - 1;
  //       }

  //       if (newValue[1] <= newValue[0]) {
  //         this.localFilters.priceRange[1] = newValue[0] + 1;
  //       }
  //     },
  //     deep: true,
  //   },
  // },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 80%;
  margin-top: 5rem;
  background-color: #bcabab00;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  z-index: 1;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
input[type="range"] {
  accent-color: green !important;
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
.range_container {
  display: flex;
  flex-direction: column;
  width: 80%;
  /* margin: 35% auto; */
}

.sliders_control {
  position: relative;
  min-height: 1rem;
}

.form_control {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  color: #635a5a;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #c6c6c6;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #c6c6c6;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #f7f7f7;
}

input[type="range"]::-webkit-slider-thumb:active {
  box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
  -webkit-box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
}

input[type="number"] {
  color: #8a8383;
  width: 50px;
  height: 30px;
  font-size: 20px;
  border: none;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  width: 100%;
  position: absolute;
  background-color: #c6c6c6;
  pointer-events: none;
}

#fromSlider {
  height: 0;
  z-index: 1;
}

@media (max-width: 992px) {
  .sidebar {
    width: 200px;
  }
}
</style>
