<template>
  <v-footer :absolute="false" app>
    <span>PoliScrypts &copy; {{ currentDate }}</span>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {
      currentDate: new Date().getFullYear(),
    };
  },
};
</script>