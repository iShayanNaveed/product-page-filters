<template>
  <div v-if="products.length" class="row w-100">
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
        <div class="d-flex justify-content-between">
          <p
            :class="{
              'text-success': product.inStock,
              'text-dan ger': !product.inStock,
            }"
          >
            {{ product.inStock ? "In Stock" : "Out of Stock" }}
          </p>
          <button class="btn btn-success">Buy Now</button>
        </div>
      </div>
    </div>
  </div>
  <p v-else>No products found based on selected filters.</p>
</template>
<script>
export default {
  props: ["products"],
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
<style></style>
