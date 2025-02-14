<template>
  <div
    class="product position-relative"
    :style="{ marginLeft: isSidebarOpen ? sidebarWidth + 'px' : 0 }"
  >
    <div class="container">
      <SideBar />
      <h2 class="my-3 mx-auto">Filtered Products</h2>
      <hr />
      <div v-if="filteredProducts.length" class="row w-100">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="col-md-6"
        >
          <ProductCard :product="product" />
        </div>
      </div>
      <p v-else>No products found based on selected filters.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SideBar from "./SideBar.vue";
import ProductCard from "./ProductCard.vue";
export default {
  components: {
    SideBar,
    ProductCard,
  },

  computed: {
    ...mapState(["isSidebarOpen"]),
    ...mapGetters(["filteredProducts"]),
    // products() {
    //   return this.filteredProducts;
    // },
    sidebarWidth() {
      return this.isSidebarOpen ? 250 : 0;
    },
  },
  methods: {},
};
</script>

<style scoped>
.product {
  display: flex;
  margin-left: 15rem;
  z-index: 1;
  transition: margin-left 0.3s ease-in-out;
}

.container {
  flex-grow: 1;
  padding: 20px;
}
</style>
