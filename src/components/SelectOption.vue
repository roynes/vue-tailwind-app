<template>
  <div>
    <LabelInput
      :title="$attrs.title"
      :label="$attrs.label"
    ></LabelInput>
    <div class="relative">
      <select 
        class="block appearance-none w-full bg-white border text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-grey-lighter focus:border-grey" 
        :id="$attrs.title"
        :class="border"

        :value="value"
        @input="$emit('input', $event.target.value)"
      >
        <option :value="item.id" v-for="(item, index) in lists" :key="index">{{ item.name }}</option>
      </select>
      <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
    <div v-if="hasAnyErrors">
      <p class="text-red text-xs italic" v-for="(error, index) in errors" :key="index">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import LabelInput from "./LabelInput.vue";

export default {
  inheritAttrs: false,

  components: {
    LabelInput
  },

  props: {
    lists: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: String,
      default: ''
    },
    errors: {
      type: Array,
      default() {
        return [];
      }
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

