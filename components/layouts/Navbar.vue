<template>
  <v-app-bar app dark>
    <nuxt-link
      v-if="isAuthenticated"
      id="link-to-home"
      class="navbar-item"
      to="/home"
    >
      <v-btn> PoliScrypts </v-btn>
    </nuxt-link>
    <v-spacer />
    <nuxt-link
      v-if="isAuthenticated"
      id="link-to-entreprises"
      class="navbar-item"
      to="/entreprise"
    >
      <v-btn to="/entreprise" text> Entreprises </v-btn>
    </nuxt-link>
    <nuxt-link
      v-if="isAuthenticated"
      id="link-to-contacts"
      class="navbar-item"
      to="/contact"
      ><v-btn> Contacts </v-btn>
    </nuxt-link>
    <v-spacer />
    <nuxt-link
      v-if="!isAuthenticated"
      id="link-to-login"
      class="navbar-item"
      to="/auth"
      ><v-btn> Connexion </v-btn>
    </nuxt-link>
    <v-menu v-if="isAuthenticated" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-icon medium color="white darken-2" v-on="on" v-bind="attrs">
          mdi-account
        </v-icon>
      </template>
      <v-card>
        <v-card-title class="primary white--text">Profile</v-card-title>
        <v-divider />
        <v-card-text>
          <span class="text-h6">{{ username }}</span>
        </v-card-text>
        <v-card-actions>
          <nuxt-link class="navbar-item" to="/auth">
            <v-btn text flat @click="logout"> Logout </v-btn>
          </nuxt-link>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      username: "profile/getUsername",
      isAuthenticated: "profile/isAuthenticated",
    }),
  },
};
</script>

