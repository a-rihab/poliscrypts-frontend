<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ formTitle }} Contact</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="FirstName"
                v-model="editedContact.firstName"
                :rules="[requiredRule('FirstName')]"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="LastName"
                v-model="editedContact.lastName"
                :rules="[requiredRule('LastName')]"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <template>
                <div>Type</div>
              </template>
              <v-radio-group v-model="editedContact.type" required row>
                <v-radio label="Employee" value="EMPLOYEE"></v-radio>
                <v-radio label="Freelancer" value="FREELANCER"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row v-if="editedContact.type == 'EMPLOYEE'">
            <v-col cols="12">
              <v-text-field
                label="Tva"
                v-model="editedContact.tva"
                :rules="[requiredRule('tva'), numberRule('tva')]"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Address"
                v-model="editedContact.address"
                :rules="[requiredRule('address')]"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete
                v-model="editedContact.entreprises"
                :items="entreprises"
                :loading="isLoading"
                item-text="address"
                item-value="id"
                prepend-icon="mdi-database-search"
                chips
                clearable
                deletable-chips
                dense
                multiple
              ></v-autocomplete>
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
import { mapGetters } from "vuex";
import ContactApi from "~/services/contact-api";
export default {
  props: ["editedContact"],
  data() {
    return {
      valid: false,
      requiredRule(propertyType) {
        return (v) => (v && v.length > 0) || `${propertyType} is required !!`;
      },
      numberRule(propertyType) {
        return (v) =>
          (v && /^\d+$/.test(v)) || `${propertyType} must be number !!`;
      },
      entries: [],
      isLoading: false,
      search: null,
      addressLimit: 30,
      params: {
        page: 0,
        limit: 5,
        sort: "id",
        dir: "desc",
        searchWord: "",
      },
      loading: false,
    };
  },
  computed: {
    formTitle() {
      return this.editedContact && this.editedContact.id > 0 ? "Edit" : "New";
    },

    ...mapGetters({
      entreprises: "entreprises/getAllEntreprises",
    }),
  },
  methods: {
    save(e) {
      this.loading = true;
      e.preventDefault();

      let method =
        this.editedContact && this.editedContact.id > 0 ? "update" : "add";

      ContactApi.createOrUpdateContact(this.editedContact)
        .then((data) => {
          this.reset();
          this.$store.dispatch(`contacts/${method}`, data);
        })
        .catch((error) => {
          let errors = error.data;
          this.reset();
          if (errors) {
            for (let field in errors) {
              this.$notify({
                type: "error",
                title: "Contact",
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