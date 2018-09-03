<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" @click="logout">
    <h1>Welcome to Home Dashboard</h1>
  </div>
</template>

<script>
import { AuthService } from "../services";

export default {
  name: "Home",
  methods: {
    logout() {
      AuthService.logout()
        .then(() => this.$router.push("/login"))
        .catch(err => {});
    }
  }
};
</script>
