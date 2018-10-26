<template>
  <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" :for="title">
    {{ label }}
  </label>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    }
  }
};
</script>
