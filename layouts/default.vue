<template>
  <v-app>
    <notifications />
    <Navbar />
    <v-main>
      <Nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "../components/layouts/Navbar.vue";
import Footer from "../components/layouts/Footer.vue";
export default {
  name: "DefaultLayout",
  components: { Navbar, Footer },
  data() {
    return {};
  },
};
</script>
