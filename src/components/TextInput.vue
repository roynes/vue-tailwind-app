<template>
  <div class="pb-3">
    <label
      class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
      :for="title"
    >
      {{ label }}
    </label>
    <input 
      class="appearance-none block w-full bg-white text-grey-darker border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-grey-lighter"
      type="text" 
      :id="title"
      :placeholder="$attrs.placeholder"
      :class="border"
      
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
    <div v-if="hasAnyErrors">
      <p class="text-red text-xs italic" v-for="(error, index) in errors" :key="index">{{ error }}</p>
    </div>
  </div>
</template>


<script>
export default {
  inheritAttrs: false,

  props: {
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: '' 
    },
    errors: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: String,
      default: ''
    },
  },

  computed: {
    hasAnyErrors() {
      return this.errors.length > 0;
    },

    border() {
      return this.hasAnyErrors ? 'border-red' : 'border-grey';
    }
  }
}
</script>