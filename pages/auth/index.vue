<template>
  <div class="w-100" style="max-height: 100%">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "~/components/auth/LoginForm";
export default {
  layout: "auth-layout",
  data() {
    return {};
  },
  components: { LoginForm },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 900);
    });
  },
};
</script>

<style></style>