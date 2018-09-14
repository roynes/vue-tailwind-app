<template>
  <div class="w-full" v-if="roles[0] != ''">
    <div class="p-6">
      <slot></slot>
    </div>
  </div>
  <div v-else>
    <Error401></Error401>
  </div>
</template>

<script>
import { Roles as ROLE } from "../helpers"
import { Error401 } from "@/pages/Error";

export default {
  data() {
    return {
      roles: [],
    }
  },
  components: {
    Error401
  },
  mounted() {
    this.roles = this.$store.state.user.roles;
  }
}
</script>
