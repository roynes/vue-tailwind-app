<template>
  <component :is="componentName"></component>
</template>

<script>
import { SuperAdminUsersList } from "@/pages/Admin";
import { GroupAdminUsersList } from "@/pages/Group";
import { ClientAdminUsersList } from "@/pages/Client";

import * as constants from "../../helpers";

export default {
  components: {
    SuperAdminUsersList,
    GroupAdminUsersList,
    ClientAdminUsersList
  },
  data() {
    return {
      componentName: ""
    };
  },
  mounted() {
    let role = this.$store.state.user.roles[0];

    this.componentName = constants.toCamelCase(`${role}-users-list`, true);
  }
};
</script>
