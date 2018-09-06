<template>
  <div class="w-full" v-show="toggle">
    <div class="w-full h-full relative overflow-y-auto py-8">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    borderTop: {
      type: String,
      default: "0px"
    },
    borderBottom: {
      type: String,
      default: "0px"
    },
    borderRight: {
      type: String,
      default: "0px"
    },
    borderLeft: {
      type: String,
      default: "0px"
    },
    toggle: {
      type: Boolean,
      default: true
    }
  }
};
</script>
