<template>
  <component :is="componentName"></component>
</template>

<script>
import { AddGroup } from "@/pages/Admin";
import { toCamelCase } from '../../helpers';

export default {
  props: {
    type: {
      type: String,
      default: ""
    }
  },

  components: {
    AddGroup
  },
  
  computed: {
    componentName() {
      return toCamelCase(`add-${this.type}`, true);
    } 
  }
}
</script>

