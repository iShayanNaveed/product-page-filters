import Vue from "vue";
import Vuex from "vuex";
import { auth, provider } from "@/Firebase/firebase.js";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import "vue-toastification/dist/index.css";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    isLoading: false,
    isSidebarOpen: true,

    products: [
      {
        id: 1,
        name: "Product A",
        price: 150,
        category: "Electronics",
        rating: 4,
        inStock: true,
      },
      {
        id: 2,
        name: "Product B",
        price: 200,
        category: "Clothing",
        rating: 3,
        inStock: false,
      },
      {
        id: 3,
        name: "Product C",
        price: 450,
        category: "Books",
        rating: 5,
        inStock: true,
      },
      {
        id: 4,
        name: "Product D",
        price: 500,
        category: "Electronics",
        rating: 2,
        inStock: true,
      },
      {
        id: 5,
        name: "Product E",
        price: 280,
        category: "Clothing",
        rating: 4,
        inStock: false,
      },

      {
        id: 6,
        name: "Wireless Mouse",
        price: 130,
        category: "Electronics",
        rating: 4,
        inStock: true,
      },
      {
        id: 7,
        name: "Smartphone",
        price: 500,
        category: "Electronics",
        rating: 5,
        inStock: false,
      },
      {
        id: 8,
        name: "Laptop",
        price: 500,
        category: "Electronics",
        rating: 3,
        inStock: true,
      },
      {
        id: 9,
        name: "Headphones",
        price: 100,
        category: "Electronics",
        rating: 4,
        inStock: true,
      },
      {
        id: 10,
        name: "Smartwatch",
        price: 250,
        category: "Electronics",
        rating: 4,
        inStock: false,
      },

      {
        id: 11,
        name: "T-Shirt",
        price: 240,
        category: "Clothing",
        rating: 5,
        inStock: true,
      },
      {
        id: 12,
        name: "Jeans",
        price: 500,
        category: "Clothing",
        rating: 4,
        inStock: true,
      },
      {
        id: 13,
        name: "Jacket",
        price: 120,
        category: "Clothing",
        rating: 3,
        inStock: false,
      },
      {
        id: 14,
        name: "Sneakers",
        price: 260,
        category: "Clothing",
        rating: 4,
        inStock: true,
      },
      {
        id: 15,
        name: "Sweater",
        price: 335,
        category: "Clothing",
        rating: 5,
        inStock: true,
      },

      {
        id: 16,
        name: "The Great Gatsby",
        price: 410,
        category: "Books",
        rating: 5,
        inStock: true,
      },
      {
        id: 17,
        name: "1984",
        price: 112,
        category: "Books",
        rating: 4,
        inStock: true,
      },
      {
        id: 18,
        name: "Moby Dick",
        price: 500,
        category: "Books",
        rating: 3,
        inStock: false,
      },
      {
        id: 19,
        name: "War and Peace",
        price: 225,
        category: "Books",
        rating: 5,
        inStock: true,
      },
      {
        id: 20,
        name: "Pride and Prejudice",
        price: 118,
        category: "Books",
        rating: 4,
        inStock: true,
      },
    ],

    filters: {
      priceRange: 500,
      category: "All",
      rating: 0,
    },
    sortOption: "price",
  },
  getters: {
    filteredProducts: (state) => {
      let filtered = state.products.filter((product) => {
        if (
          state.filters.category !== "All" &&
          product.category !== state.filters.category
        ) {
          return false;
        }
        if (product.price > state.filters.priceRange) {
          return false;
        }
        if (state.filters.rating > 0 && product.rating < state.filters.rating) {
          return false;
        }
        return true;
      });

      if (state.sortOption === "price") {
        return filtered.sort((a, b) => a.price - b.price);
      } else if (state.sortOption === "rating") {
        return filtered.sort((a, b) => b.rating - a.rating);
      }
      return filtered;
    },
    isAuthenticated: (state) => state.user !== null && state.user !== undefined,

    isSidebarOpen: (state) => state.isSidebarOpen,
  },
  mutations: {
    setFilter(state, { key, value }) {
      state.filters[key] = value;
      console.log("test dot syntax", state.filters);
    },
    setSortOption(state, option) {
      state.sortOption = option;
    },
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    setIsloading(state, loading) {
      state.isLoading = loading;
    },

    TOGGLE_SIDEBAR(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  actions: {
    updateFilter({ commit }, payload) {
      commit("setFilter", payload);
    },
    updateSortOption({ commit }, option) {
      commit("setSortOption", option);
    },
    async signup({ commit }, { email, password }) {
      try {
        commit("setLoading", true);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("setUser", userCredential.user);
        commit("setLoading", false);
        Vue.$toast.success("Signup successful! ", { duration: 1000 });
      } catch (error) {
        commit("setLoading", false);
        Vue.$toast.error(`Signup failed: ${error.message}`, {
          duration: 1000,
        });
        console.log("Error signing up:", error);
        throw error;
      }
    },
    async login({ commit }, { email, password }) {
      try {
        commit("setLoading", true);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("setUser", userCredential.user);
        commit("setLoading", false);
        Vue.$toast.success("Login successful! ", { duration: 1000 });
      } catch (error) {
        commit("setLoading", false);
        Vue.$toast.error(`Login failed: ${error.message}`, {
          duration: 1000,
        });
        console.log("Error logging in:", error);
        throw error;
      }
    },
    async signinWithGoogle({ commit }) {
      try {
        commit("setIsloading", true);
        const result = await signInWithPopup(auth, provider);
        console.log("Google Sign-In Successful:", result.user);
        commit("setUser", result.user);
        commit("setIsloading", false);
        Vue.$toast.success("Google Sign-In successful! ", {
          duration: 1000,
        });
      } catch (error) {
        commit("setIsloading", false);
        Vue.$toast.error(`Google Sign-In failed: ${error.message}`, {
          duration: 1000,
        });
        console.error("Google Sign-In Error:", error.message);
        throw error;
      }
    },

    async signupWithGoogle({ commit }) {
      try {
        commit("setIsloading", true);
        const result = await signInWithPopup(auth, provider);
        console.log("Google Sign-Up Successful:", result.user);
        commit("setUser", result.user);
        commit("setIsloading", false);
        Vue.$toast.success("Google Sign-Up successful! ", {
          duration: 1000,
        });
      } catch (error) {
        commit("setIsloading", false);
        Vue.$toast.error(`Google Sign-Up failed: ${error.message}`, {
          duration: 1000,
        });
        throw error;
      }
    },

    async logout({ commit }) {
      try {
        commit("setLoading", true);
        await signOut(auth);
        commit("clearUser");
        commit("setLoading", false);
        Vue.$toast.success("Logout successful! ", { duration: 1000 });
      } catch (error) {
        commit("setLoading", false);
        console.error("Logout failed:", error);
        Vue.$toast.error(`Logout failed: ${error.message}`, {
          duration: 1000,
        });
        throw error;
      }
    },
    toggleSidebar({ commit }) {
      commit("TOGGLE_SIDEBAR");
    },
  },
  modules: {},
});
