<template>
  <div class="w-100" style="max-height: 100%">
    <Table @new="toggle" @edit="edit" />

    <v-dialog v-model="showDialog" max-width="500px">
      <Add @toggle="toggle" :editedEntreprise="editedEntreprise" />
    </v-dialog>
  </div>
</template>

<script>
import Table from "~/components/enterprise/Table";
import Add from "~/components/enterprise/Add";
import { mapGetters } from "vuex";

export default {
  layout: "default",
  computed: {
    ...mapGetters({
      enterprises: "enterprises/getAllEntreprises",
      totalElements: "enterprises/getTotalElements",
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
        this.enterprises.find((e) => e.id === id)
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
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 900);
    });
  },
};
</script>
