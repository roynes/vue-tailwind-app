<template>
  <component :is="componentName"></component>
</template>

<script>
import { AddGroup, AddClient, AddUser } from "@/pages/Admin";
import { toCamelCase } from '../../helpers';

export default {
  props: {
    type: {
      type: String,
      default: ""
    }
  },

  components: {
    AddGroup, AddClient, AddUser
  },
  
  computed: {
    componentName() {
      return toCamelCase(`add-${this.type}`, true);
    } 
  }
}
</script>

