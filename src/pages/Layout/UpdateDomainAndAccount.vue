<template>
  <component :is="componentName" :input="input"></component>
</template>

<script>
import {
  UpdateGroup,
  UpdateClient,
  UpdateUser
} from "@/pages/Admin";

import { toCamelCase } from "../../helpers";

export default {
  props: {
    type: {
      type: String,
      default: ""
    },
    input: {}
  },

  components: {
    UpdateGroup,
    UpdateClient,
    UpdateUser
  },

  computed: {
    componentName() {
      return toCamelCase(`update-${this.type}`, true);
    }
  }
};
</script>
