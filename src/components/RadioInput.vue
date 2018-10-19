<template>
  <div>
    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" :for="title">
      Role
    </label>
    <div class="flex flex-col mb-2 justify-center w-full items-start">
      <div v-for="(input, index) in inputs" :key="index" class="flex items-center">
        <input 
          type="radio"
          :id="`rb-${index}`"
          :name="`rb-${title}`"

          :value="input"
          @input="$emit('input', input)"
        >
        <label :for="`rb-${index}`" class="input-label">{{ input.replace(/\W+/g, ' ') }}</label>
      </div>
    </div>
    <div v-if="hasAnyErrors">
      <p class="text-red text-xs italic" v-for="(error, index) in errors" :key="index">{{ error }}</p>
    </div>
  </div>
</template>

<script>
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
      type: Array,
      default() {
        return [];
      }
    },
    inputs: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  computed: {
    hasAnyErrors() {
      return this.errors.length > 0;
    }
  }
}
</script>

<style lang="scss" scoped>

@tailwind utilities;

input[type='radio'] {
  height: 0.1px;
  width: 0.1px;
  opacity: 0;

  &:checked + label.input-label {
    @apply text-black px-2 
  }

  &:checked + label.input-label::before {
    @apply w-full h-full mt-0 z-n1
  }
}

label.input-label {
  @apply leading-loose capitalize relative cursor-pointer inline-block px-5 z-top;
}

label.input-label::before {
  content: ' ';
  @apply absolute block rounded-full w-4 h-4  mt-2 pin-l border border-orange-lighter bg-orange-lighter;
}

label.input-label,
label.input-label::before {
  -webkit-transition: .25s all ease;
  -o-transition: .25s all ease;
  transition: .25s all ease;
}

</style>