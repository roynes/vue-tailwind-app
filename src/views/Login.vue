<template>
  <!-- login pane -->
  <div class="login xs:bg-grey-lightest">
    <div class="mx-auto container min-h-screen flex justify-center items-center">
      <div class="box xs:border xs:shadow-md xs:rounded bg-white">
        <div class="px-20 pt-16 pb-12 text-center">
          <!-- Member Login -->
          <h1>Member Login</h1>
        </div>
        <div class="px-10 pb-10">
          <float-label-input class="mb-6" title="Email" inputName="email"></float-label-input>
          <float-label-input  title="Password" inputName="password"></float-label-input>
        </div>
        <div class="px-10 pb-10 pt-10 flex items-center justify-between">
          <a href="#" class="py-3 px-3 border border-blue no-underline bg-blue text-grey-lightest rounded">
            Submit
          </a>
          <a href="#" class="py-3 px-3 text-blue no-underline rounded focus:bg-blue-lightest">
            Forgot password
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FloatLabelInput from "../components/FloatLabelInput.vue";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    doNothing() {
      // nothing is done here
    }
  },
  components: {
    FloatLabelInput
  }
};
</script>

<style lang="scss" scoped>
.box {
  @media screen and (min-width: 1200px) {
    width: 400px !important;
    height: 500px !important;
  }
}

input {
  &:placeholder-shown + label {
    cursor: text;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -ms-text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    transform: translate(0, 1.9rem);
    -moz-transform: translate(0, 1.9rem);
    -o-transform: translate(0, 1.9rem);
    -webkit-transform: translate(0, 1.9rem);
  }
  &,
  label {
    transition: 1s;
    -moz-transition: 1s;
    -o-transition: 1s;
    -webkit-transition: 1s;
  }
  &::placeholder {
    opacity: 0;
    transition: 1s;
    -moz-transition: 1s;
    -o-transition: 1s;
    -webkit-transition: 1s;
  }
  &::-moz-placeholder {
    opacity: 0;
    transition: 1s;
    -moz-transition: 1s;
    -o-transition: 1s;
    -webkit-transition: 1s;
  }
  &::-webkit-input-placeholder {
    opacity: 0;
    transition: 1s;
    -moz-transition: 1s;
    -o-transition: 1s;
    -webkit-transition: 1s;
  }
  &:not(:placeholder-shown) + label {
    transform: translate(-2rem, 0.5rem) scale(0.8);
    -moz-transform: translate(-2rem, 0.5rem) scale(0.8);
    -o-transform: translate(-2rem, 0.5rem) scale(0.8);
    -webkit-transform: translate(-2rem, 0.5rem) scale(0.8);
    cursor: pointer;
  }
  &:focus + label {
    transform: translate(-2rem, 0.5rem) scale(0.8);
    -moz-transform: translate(-2rem, 0.5rem) scale(0.8);
    -o-transform: translate(-2rem, 0.5rem) scale(0.8);
    -webkit-transform: translate(-2rem, 0.5rem) scale(0.8);
    cursor: pointer;
  }
}
</style>
