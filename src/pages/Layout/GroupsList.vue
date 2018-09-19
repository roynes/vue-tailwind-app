<template>
  <component :is="componentName"></component>
</template>

<script>
import { SuperAdminGroupsList } from "@/pages/Admin";
import { GroupAdminGroupsList } from "@/pages/Group";

import * as constants from "../../helpers";

export default {
  components: {
    SuperAdminGroupsList,
    GroupAdminGroupsList
  },
  data() {
    return {
      componentName: ""
    };
  },
  mounted() {
    let role = this.$store.state.user.roles[0];
    this.componentName = constants.toCamelCase(`${role}-groups-list`, true);
  }
};
</script>
