<template>
  <v-row justify="center" align="center">
    <v-app-bar app dark>
      <v-spacer />
      <nuxt-link id="link-to-login" class="navbar-item" to="/auth"
        ><v-btn> Connexion </v-btn>
      </nuxt-link>
    </v-app-bar>
    <v-col cols="12" class="text-center">
      <h1>Welcome to PoliScrypts mini project</h1>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
