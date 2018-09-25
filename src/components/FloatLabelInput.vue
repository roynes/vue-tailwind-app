<template>
  <div>
    <div class="flex flex-col-reverse items-left">
      <input :type="type" 
        :id="inputName" 
        :name="inputName"
        class="py-3  w-full border-b-2 focus:border-b-2 focus:outline-none bg-transparent"
        :class="[ errors.has(scopeFieldName) ? 'border-red' : 'border-blue' ]" 
        placeholder=" "
        :value="value"
        @input="$emit('input', $event.target.value)"
        v-validate.continues="validate"
        :data-vv-scope="inputName"
        data-vv-delay="180"
      >
      <label :for="inputName" class="w-full py-1">{{ title }}</label>
    </div>
    <div v-for="(error, index) in errors.all(inputName)" :key="index">
      <span class="text-red text-xs font-light">{{ error }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "FloatLabelInput",
  props: {
    inputName: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: ""
    },
    validate: {
      type: String,
      default: "required"
    }
  },
  computed: {
    scopeFieldName() {
      return `${this.inputName}.${this.inputName}`;
    }
  }
};
</script>

<style scoped>
input,
label {
  transition: 0.2s;
  -moz-transition: 0.2s;
  -o-transition: 0.2s;
  -webkit-transition: 0.2s;
}

input:placeholder-shown + label {
  cursor: text;
  white-space: nowrap;
  overflow: hidden;

  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;

  transform: translate(0, 2.09rem) scale(1);
  -moz-transform: translate(0, 2.09rem) scale(1);
  -o-transform: translate(0, 2.09rem) scale(1);
  -ms-transform: translate(0, 2.09rem) scale(1);
  -webkit-transform: translate(0, 2.09rem) scale(1);
}

input::-moz-placeholder {
  opacity: 0;
  transition: inherit;
  -moz-transition: inherit;
  -o-transition: inherit;
  -webkit-transition: inherit;
}

input::-webkit-input-placeholder {
  opacity: 0;
  transition: inherit;
  -moz-transition: inherit;
  -o-transition: inherit;
  -webkit-transition: inherit;
}

input:not(:placeholder-shown) + label,
input:focus + label {
  cursor: pointer;

  white-space: nowrap;
  overflow: hidden;

  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;

  transform: translate(-10%, 0.5rem) scale(0.8);
  -moz-transform: translate(-10%, 0.5rem) scale(0.8);
  -o-transform: translate(-10%, 0.5rem) scale(0.8);
  -webkit-transform: translate(-10%, 0.5rem) scale(0.8);
}
</style>
