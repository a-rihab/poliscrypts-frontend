<template>
  <v-app style="background-color: white">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-alert dense dark type="error" :value="alert">
                {{ error }}
              </v-alert>
              <v-card-text>
                <v-form v-model="valid" class="login">
                  <v-text-field
                    label="Username"
                    type="text"
                    v-model="username"
                    :rules="[
                      requiredRule('username'),
                      minLengthRule('username', 4),
                    ]"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    type="password"
                    v-model="password"
                    :rules="[
                      requiredRule('password'),
                      minLengthRule('password', 7),
                    ]"
                    required
                  ></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      type="submit"
                      color="primary"
                      @click="login"
                      :disabled="!valid"
                      >Login</v-btn
                    >
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      valid: false,
      error: "",
      alert: false,
      username: "",
      password: "",
      isLoading: false,
      requiredRule(propertyType) {
        return (v) => (v && v.length > 0) || `${propertyType} is required !!`;
      },
      minLengthRule(propertyType, minLength) {
        return (v) =>
          (v && v.length > minLength) ||
          `${propertyType} must be not less then ${minLength}  !!`;
      },
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      this.isLoading = true;

      axios({
        method: "POST",
        url: "https://poliscrypts-backend.herokuapp.com/api/login",
        headers: {
          "content-type": "application/json",
        },
        data: {
          username: this.username,
          password: this.password,
        },
      })
        .then(({ data: { accessToken, refreshToken, username, roles } }) => {
          this.$store.dispatch("profile/login", { username, roles });
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("username", username);
          localStorage.setItem("roles", roles);
          this.isLoading = false;
          this.$router.push("home");
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = "Utilisateur ou mot de passe incorrect.";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
          console.log("Error!!", error.message);
        });
    },
  },
};
</script>

<style></style>
