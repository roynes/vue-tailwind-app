<template>
  <component :is="componentName"></component>
</template>

<script>
import { SuperAdminClientsList } from "@/pages/Admin";
import { GroupAdminClientsList } from "@/pages/Group";

import * as constants from "../../helpers";

export default {
  components: {
    SuperAdminClientsList,
    GroupAdminClientsList
  },
  data() {
    return {
      componentName: ""
    };
  },
  mounted() {
    let role = this.$store.state.user.roles[0];
    this.componentName = constants.toCamelCase(`${role}-clients-list`, true);
  }
};
</script>
