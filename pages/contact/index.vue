<template>
  <div class="w-100" style="max-height: 100%">
    <Table @new="toggle" @edit="edit" />

    <v-dialog v-model="showDialog" max-width="700px">
      <Add @toggle="toggle" :editedContact="editedContact" />
    </v-dialog>
  </div>
</template>

<script>
import Table from "~/components/contact/Table";
import Add from "~/components/contact/Add";
import { mapGetters } from "vuex";

export default {
  layout: "default",
  computed: {
    ...mapGetters({
      contacts: "contacts/getAllContacts",
      totalElements: "contacts/getTotalElements",
    }),
  },
  data() {
    return {
      showDialog: false,
      editedContact: {
        firstName: "",
        lastName: "",
        type: "",
        address: "",
        tva: "",
        entreprises: [],
      },
      defaultContact: {
        firstName: "",
        lastName: "",
        type: "",
        address: "",
        tva: "",
        entreprises: [],
      },
    };
  },
  components: { Table, Add },
  methods: {
    edit(id) {
      this.editedContact = Object.assign(
        {},
        this.contacts.find((e) => e.id === id)
      );
      this.showDialog = true;
    },
    toggle() {
      this.$nextTick(() => {
        this.editedContact = Object.assign({}, this.defaultContact);
      });
      this.showDialog = !this.showDialog;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 900);
    });
  },
};
</script>
