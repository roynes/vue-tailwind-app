<template>
  <div>
    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" :for="$attrs.title">
      Description
    </label>
    <textarea 
      class="focus:outline-none rounded w-full focus:bg-grey-lighter bg-white h-48 p-2 border max-h-120 border-grey" 
      placeholder="Write description here..."

      :id="$attrs.title" 
      :name="$attrs.name" 

      :value="value"
      @input="$emit('input', $event.target.value)"
    />
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
    value: {
      type: String,
      default: ''
    },
  }
}
</script>
