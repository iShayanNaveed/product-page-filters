<template>
  <div>
    <Navbar />
    <ProductList />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import ProductList from "@/components/ProductList.vue";

export default {
  components: {
    Navbar,
    ProductList,
  },
};
</script>
<style></style>
