<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" @click="logout">
    <h1>Welcome to Home Dashboard</h1>
  </div>
</template>

<script>
import { UserService } from "../services";

export default {
  name: "Home",
  methods: {
    logout() {
      UserService.logout()
        .then(() => this.$router.push("/login"))
        .catch(err => console.log(err.response));
    }
  }
};
</script>
