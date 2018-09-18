<template>
  <component :is="componentName"></component>
</template>

<script>
import { SuperAdminDashboard } from "@/pages/Admin";
import { GroupAdminDashboard } from "@/pages/Group";
import { ClientAdminDashboard } from "@/pages/Client";

import * as constants from "../../helpers";

export default {
  components: {
    SuperAdminDashboard,
    GroupAdminDashboard,
    ClientAdminDashboard
  },
  data() {
    return {
      componentName: ""
    }
  },
  mounted() {
    let role = this.$store.state.user.roles[0];;
    this.componentName = constants.toCamelCase(`${role}-dashboard`, true);
  }
}
</script>


