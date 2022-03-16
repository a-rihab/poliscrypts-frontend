<template>
  <div class="text-center">
    <div class="notfound">
      <h1>Erreur 404</h1>
    </div>
    <div class="text-center">
      <img src="../assets/404.jpg" alt="" width="800" />
    </div>
    <nuxt-link class="notfound-link" to="/">
      <v-btn class="primary">Home Page</v-btn>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "auth-layout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
* {
  transition: all 0.6s;
}
html {
  height: 100%;
}
body {
  font-family: "Lato", sans-serif;
  color: #888;
  margin: 0;
}
#main {
  display: table;
  width: 100%;
  height: 100vh;
  text-align: center;
}
.notfound-content {
  display: flex;
  justify-content: center;
  height: 100vh;
  flex-direction: row;
}
.notfound-content h1 {
  margin-top: 250px;
  font-size: 50px;
  display: inline-block;
  padding-right: 12px;
  animation: type 0.5s alternate infinite;
}
.notfound-content .notfound .btn-home {
  background: #63b9ff;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: none;
}
.notfound-content .notfound .notfound-link {
  text-decoration: none;
  color: white;
}
@keyframes type {
  from {
    box-shadow: inset -3px 0px 0px #888;
  }
  to {
    box-shadow: inset -3px 0px 0px transparent;
  }
}
</style>


