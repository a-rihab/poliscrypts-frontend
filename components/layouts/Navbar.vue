<template>
  <v-app-bar app dark>
    <nuxt-link id="link-to-home" class="navbar-item" to="/home">
      <v-btn> PoliScrypts </v-btn>
    </nuxt-link>
    <v-spacer />
    <nuxt-link id="link-to-entreprises" class="navbar-item" to="/entreprise">
      <v-btn to="/entreprise" text> Entreprises </v-btn>
    </nuxt-link>
    <nuxt-link id="link-to-contacts" class="navbar-item" to="/contact"
      ><v-btn> Contacts </v-btn>
    </nuxt-link>
    <v-spacer />
    <v-menu offset-y>
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
          <v-btn text color="blue darken-1" @click="logout"
            >Logout</v-btn
          ></v-card-actions
        >
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
    }),
  },
  methods: {
    logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");
      localStorage.removeItem("roles");
      this.$router.push("/auth");
    },
  },
};
</script>

