<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12">
      <v-text-field
        v-model="searchText"
        ref="searchTextRef"
        label="Search by Address"
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="12">
      <template>
        <v-data-table
          :headers="headers"
          :items="contacts"
          :items-per-page="params.limit"
          :options.sync="options"
          :server-items-length="totalElements"
          :loading="loading"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Contacts</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="showDeleteDialog" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Are you sure you want to delete this contact with id
                    {{ deletedId }} ?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="closeDeleteConfirm"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <template>
                <v-btn color="primary" dark class="mb-2" @click="create">
                  New
                </v-btn>
              </template>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="$emit('edit', item.id)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="remove(item.id)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="reloadData"> Reset </v-btn>
          </template>
        </v-data-table>
      </template></v-col
    ></v-row
  >
</template>
<script>
import { mapGetters } from "vuex";
import ContactApi from "~/services/contact-api";
export default {
  data() {
    return {
      params: {
        page: 0,
        limit: 5,
        sort: "id",
        dir: "desc",
        searchWord: "",
      },
      searchText: "",
      loading: true,
      options: {},
      headers: [
        { text: "#", value: "id" },
        { text: "FirstName", value: "firstName" },
        { text: "LastName", value: "lastName" },
        { text: "Type", value: "type" },
        { text: "Address", value: "address" },
        { text: "Tva", value: "tva" },
        { text: "Entreprises", value: "entreprises" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      valid: true,
      deletedId: -1,
      showDialog: false,
      showDeleteDialog: false,
    };
  },
  computed: {
    ...mapGetters({
      contacts: "contacts/getAllContacts",
      totalElements: "contacts/getTotalElements",
    }),
  },

  watch: {
    searchText(newVal) {
      setTimeout(() => {
        if (newVal === this.$refs.searchTextRef.value) {
          console.log(this.searchText);
          this.loadAllContacts();
        }
      }, 500);
    },
    options: {
      handler() {
        this.loadAllContacts();
      },
      deep: true,
    },
  },
  methods: {
    //load all contacts and push the data  to store
    loadAllContacts() {
      this.loading = true;

      const { sortBy, sortDesc, page, itemsPerPage } = this.options;

      this.params.page = page - 1;
      this.params.limit = itemsPerPage;
      this.params.sort = sortBy.length > 0 ? sortBy[0] : "id";
      this.params.dir = sortDesc[0] ? "asc" : "desc";
      this.params.searchWord = this.searchText;

      ContactApi.getAllContacts(this.$store, this.params)
        .then((data) => {
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    reloadData() {
      this.loadAllContacts();
    },
    create() {
      this.$emit("new");
    },
    remove(id) {
      this.deletedId = id;
      this.showDeleteDialog = true;
    },
    deleteConfirm() {
      ContactApi.deleteContactById(this.deletedId)
        .then(() => {
          this.$store.dispatch("contacts/remove", this.deletedId);
          this.reloadData();
          this.closeDeleteConfirm();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeDeleteConfirm() {
      this.$emit("clear");
      this.showDeleteDialog = false;
    },
  },
  mounted() {
    this.loadAllContacts();
  },
};
</script>