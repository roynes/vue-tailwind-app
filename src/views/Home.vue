<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" @click="logout">
    <h1>Welcome to Home Dashboard</h1>
  </div>
</template>

<script>
import { AuthConstants as AUTH_CONSTANT } from "../storage";
import { mapActions } from 'vuex';

export default {
  name: "Home",
  methods: {
    ...mapActions('auth', {
      logout(dispatch) {
        dispatch(AUTH_CONSTANT.UNAUTHENTICATE).then(() => {
          this.$router.push('/login');
        })
      }
    })
  }
};
</script>
