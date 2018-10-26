<template>
  <div class="flex flex-col">
    <LabelInput
      :title="$attrs.title"
      :label="$attrs.label"
    ></LabelInput>
    <div class="w-full rounded border h-48 max-h-48 flex items-center justify-center bg-grey-light flex-col relative border-grey">
      <div v-show="!logoAvailable" class="tracking-wide uppercase absolute">
        Click to upload logo
      </div>

      <img v-show="logoAvailable" class="absolute" ref="imgRef" :src="imgSrc">

      <input 
        type="file" 
        name="logo" 
        id="logo"
        class="opacity-0 w-full h-full"
        @change="readFile"
      >              
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
    value: {
      type: String,
      default: ""
    },

    imgSrc: {}
  },

  data() {
    return {
      logoAvailable: false
    };
  },

  model: {
    event: "change"
  },

  methods: {
    readFile(event) {
      let reader = new FileReader();

      reader.onload = e => {
        this.logoAvailable = true;
        this.$refs.imgRef.setAttribute("src", e.target.result);

        this.$emit("change", e.target.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    },

    reset() {
      this.logoAvailable = false;
      this.$refs.imgRef.setAttribute("src", null);
    }
  },

  mounted() {
    if (this.imgSrc) this.logoAvailable = true;
  }
};
</script>
