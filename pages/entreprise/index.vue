<template>
  <div class="w-100" style="max-height: 100%">
    <Table @new="toggle" @edit="edit" />

    <v-dialog v-model="showDialog" max-width="500px">
      <Add @toggle="toggle" :editedEntreprise="editedEntreprise" />
    </v-dialog>
  </div>
</template>

<script>
import Table from "~/components/entreprise/Table";
import Add from "~/components/entreprise/Add";
import { mapGetters } from "vuex";

export default {
  layout: "default",
  computed: {
    ...mapGetters({
      entreprises: "entreprises/getAllEntreprises",
      totalElements: "entreprises/getTotalElements",
    }),
  },
  data() {
    return {
      showDialog: false,
      editedEntreprise: {
        address: "",
        tva: "",
      },
      defaultEntreprise: {
        address: "",
        tva: "",
      },
    };
  },
  components: { Table, Add },
  methods: {
    edit(id) {
      this.editedEntreprise = Object.assign(
        {},
        this.entreprises.find((e) => e.id === id)
      );
      this.showDialog = true;
    },
    toggle() {
      this.$nextTick(() => {
        this.editedEntreprise = Object.assign({}, this.defaultEntreprise);
      });
      this.showDialog = !this.showDialog;
    },
  },
};
</script>
