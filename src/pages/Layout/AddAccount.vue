<template>
  <component :is="componentName"></component>
</template>

<script>
import { AddGroup, AddClient } from "@/pages/Admin";
import { toCamelCase } from '../../helpers';

export default {
  props: {
    type: {
      type: String,
      default: ""
    }
  },

  components: {
    AddGroup, AddClient
  },
  
  computed: {
    componentName() {
      return toCamelCase(`add-${this.type}`, true);
    } 
  }
}
</script>

