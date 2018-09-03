<template>
  <!-- login pane -->
  <div class="login xs:bg-grey-lightest">
    <div class="mx-auto container min-h-screen flex justify-center items-center">
      <div class=" xs:border xs:shadow-md xs:rounded bg-white">
        <div class="px-20 pt-16 pb-8 text-center">
          <!-- Member Login -->
          <h1>Member Login</h1>
        </div>
        <div class="px-10 pb-10">
          <float-label-input class="pb-6" 
            title="Email" 
            inputName="email"
            v-model="form.email"
            validate="required|email"
          ></float-label-input>
          <float-label-input  
            title="Password" 
            inputName="password"
            v-model="form.password"
            type="password"
          ></float-label-input>
        </div>
        <div class="px-10 mb-10 pt-10 flex items-center justify-between">
          <button 
            type="button"  
            class="py-3 px-3 border  no-underline text-grey-lightest rounded"
            @click="login()"
            :disabled="fieldHasErrors"
            :class="[fieldHasErrors ? 'bg-grey-dark border-grey-dark' : 'bg-blue border-blue']"
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
import { AuthService } from "../services";
import { Form } from "../utilities";

export default {
  name: "Login",
  data() {
    return {
      form: new Form({ email: "", password: "" })
    };
  },
  methods: {
    login() {
      AuthService.login(this.form.email, this.form.password)
        .then(resp => {
          this.form.reset();
          this.$router.push("/");
        })
        .catch(err => {});
    }
  },
  computed: {
    fieldHasErrors() {
      return this.errors.items.length >= 1;
    }
  },
  components: {
    FloatLabelInput
  }
};
</script>
