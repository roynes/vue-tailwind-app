<template>
  <div>
    <LabelInput
      :title="$attrs.title"
      :label="$attrs.label"
    ></LabelInput>
    <div class="relative border rounded shadow-inner leading-tight bg-grey-light p-3 cursor-pointer">
      <div 
        class="w-full flex item-center justify-between"
        :name="$attrs.title"
        @click="toggle = !toggle"
      >
        <span class="w-4/5 text-left truncate">
          {{ chosenName || $attrs.placeholder || 'Choose options' }}
        </span>

        <svg class="h-4 w-1/5" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129">
          <g>
            <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
          </g>
        </svg>
      </div>
      <div
        class="rounded shadow-md mt-2 absolute mt-12 pin-t pin-l min-w-full z-top bg-white"
        v-show="toggle"
      >
        <ListSingleRow
          :lists="lists"
          :chosen="chosenId"
          @click="chosenData($event)"
        ></ListSingleRow>
      </div>
    </div>
  </div>
</template>

<script>
import ListSingleRow from "./ListSingleRow.vue";
import LabelInput from "./LabelInput.vue";

export default {
  inheritAttrs: false,

  components: {
    LabelInput,
    ListSingleRow
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
      default: ""
    },
    errors: {
      type: Array,
      default() {
        return [];
      }
    },
    chosenOption: {
      type: Object,
      default() {
        return {
          id: '',
          name: ''
        }
      }
    }
  },

  data() {
    return {
      toggle: false
    };
  },

  computed: {
    hasAnyErrors() {
      return this.errors.length > 0;
    },

    border() {
      return this.hasAnyErrors ? "border-red" : "border-grey";
    },

    chosenName(){
        return this.chosenOption.name;
    },

    chosenId() {
        return this.chosenOption.id;
    }
  },

  methods: {
    chosenData(value) {
      this.toggle = false;
      this.$emit("click", value);
    }
  }
};
</script>