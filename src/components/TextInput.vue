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
      :placeholder="placeholder"
      :value="value"
      :class="border"
      @input="$emit('input', $event.target.value)"
    >
    <div v-if="Object.keys(errors).length > 0">
      <p class="text-red text-xs italic" v-for="(error, index) in errors[title]" :key="index">{{ error }}</p>
    </div>
  </div>
</template>


<script>
import { Errors } from '@/utilities';

export default {
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
      type: Object,
      default() {
        return [];
      }
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>
