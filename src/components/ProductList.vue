<template>
  <div class="container">
    <hr />
    <h2 class="my-3 mx-2">Filtered Products</h2>
    <hr />
    <div v-if="products.length" class="row">
      <div v-for="product in products" :key="product.id" class="col-md-6">
        <div class="product-card mx-auto mt-2 p-3 border rounded shadow-sm">
          <div class="d-flex justify-content-between">
            <h3>{{ product.name }}</h3>
            <p class="text-muted font-weight-bold">${{ product.price }}</p>
          </div>
          <p class="mb-1">
            Category: <strong>{{ product.category }}</strong>
          </p>
          <p class="mb-1">
            Rating:
            <span v-html="getStarRating(product.rating)"></span>
          </p>
          <p
            :class="{
              'text-success': product.inStock,
              'text-danger': !product.inStock,
            }"
          >
            {{ product.inStock ? "In Stock" : "Out of Stock" }}
          </p>
        </div>
      </div>
    </div>
    <p v-else>No products found based on selected filters.</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["filteredProducts"]),
    products() {
      return this.filteredProducts;
    },
  },
  methods: {
    getStarRating(rating) {
      let stars = "";
      for (let i = 0; i < 5; i++) {
        stars += i < rating ? "⭐" : "☆";
      }
      return stars;
    },
  },
};
</script>

<style scoped></style>
