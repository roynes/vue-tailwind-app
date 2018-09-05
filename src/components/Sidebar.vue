<template>
  <div class="side-bar col-span-2 hover:overflow-y-scroll overflow-y-auto">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    marginTop: {
      type : String,
      default: "100"
    }
  }
};
</script>
