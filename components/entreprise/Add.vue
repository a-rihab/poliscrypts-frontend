<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ formTitle }} Entreprise</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Address"
                v-model="editedEntreprise.address"
                :rules="[requiredRule('address')]"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Tva"
                name="tva"
                v-model="editedEntreprise.tva"
                :rules="[requiredRule('tva'), numberRule('tva')]"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reset"> Cancel </v-btn>
          <v-btn
            type="submit"
            color="blue darken-1"
            @click="save"
            :disabled="!valid"
            :loading="loading"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import EntrepriseApi from "~/services/entreprise-api";
export default {
  props: ["editedEntreprise"],
  data() {
    return {
      loading: false,
      valid: false,
      requiredRule(propertyType) {
        return (v) => (v && v.length > 0) || `${propertyType} is required !!`;
      },
      numberRule(propertyType) {
        return (v) =>
          (v && /^\d+$/.test(v)) || `${propertyType} must be number !!`;
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedEntreprise && this.editedEntreprise.id > 0
        ? "Edit"
        : "New";
    },
  },
  methods: {
    save(e) {
      this.loading = true;
      e.preventDefault();
      let method =
        this.editedEntreprise && this.editedEntreprise.id > 0
          ? "update"
          : "add";
      EntrepriseApi.createOrUpdateEntreprise(this.editedEntreprise)
        .then((data) => {
          this.reset();
          this.$store.dispatch(`entreprises/${method}`, data);
        })
        .catch((error) => {
          let errors = error.data;
          this.reset();
          if (errors) {
            for (let field in errors) {
              this.$notify({
                type: "error",
                title: "Entreprise",
                text: errors[field],
                duration: 3000,
                speed: 1000,
              });
            }
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.$emit("toggle");
    },
  },
};
</script>

<style>
</style>