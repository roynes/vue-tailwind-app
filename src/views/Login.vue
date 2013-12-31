<template>
  <!-- login pane -->
  <div class="login xs:bg-grey-lightest">
    <div class="mx-auto container min-h-screen flex justify-center items-center">
      <div class="box xs:border xs:shadow-md xs:rounded bg-white">
        <div class="px-20 pt-16 pb-8 text-center">
          <!-- Member Login -->
          <h1>Member Login</h1>
        </div>
        <div class="px-10 pb-10">
          <float-label-input class="pb-6" 
            title="Email" 
            inputName="email"
            v-model="email"
            validate="required|email"
          ></float-label-input>
          <float-label-input  
            title="Password" 
            inputName="password"
            v-model="password"
            type="password"
          ></float-label-input>
        </div>
        <div class="px-10 mb-10 pt-10 flex items-center justify-between">
          <button 
            type="button"  
            class="py-3 px-3 border  no-underline text-grey-lightest rounded"
            @click="login()"
            :disabled="fieldsEmpty"
            :class="[fieldsEmpty ? 'bg-grey-dark border-grey-dark' : 'bg-blue border-blue']"
          >
            Submit
          </button>
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

let baseUri = process.env.VUE_APP_BASE_URI;

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {

      Axios.post("http://api.test/api/login", {
        email: this.email,
        password: this.password
      })
        .then(resp => {
          this.$router.push({
            name: 'home'
          })
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  },
  computed: {
    fieldsEmpty() {
      return this.email === "" || this.password === "";
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
</style>
