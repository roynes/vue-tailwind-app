<template>
  <div class="flex flex-col">
    <label 
      class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" 
      :for="title"
      v-if="!!title"
    >
      {{label}}
    </label>
    <div 
      class="border rounded p-1 overflow-y-auto text-center" 
      :class="[height]"
      :id="title"
    >
      <div 
        class="rounded hover:bg-blue-lighter p-1 my-1 hover:font-semibold"
        v-for="(list, index) in lists"
        :key="index"
        @click="$emit('click', list.id)"
        :class="[ chosen == list.id ? 'bg-blue text-white' : '' ]"
      >
        {{list.name}}
      </div>
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
    height: {
      type: String,
      default: 'h-40'
    },
    lists: {
      type: Array,
      default() {
        return [];
      }
    },
    chosen: {
    }
  },
}
</script>