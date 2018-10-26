<template>
  <!-- login pane -->
  <div class="login bg-grey-lightest">
    <div class="mx-auto container min-h-screen flex justify-center items-center">
      <div class=" xs:border xs:shadow-md xs:rounded bg-white">
        <div class="px-20 pt-16 pb-8 text-center flex flex-col">
          <!-- Member Login -->
          <h1>Member Login</h1>
        </div>

        <div class="px-10 pb-10">
          <float-label-input class="pb-6" 
            title="Email" 
            inputName="email"
            v-model="form.email"
          ></float-label-input>
          <float-label-input  
            title="Password" 
            inputName="password"
            v-model="form.password"
            type="password"
          ></float-label-input>
        </div>

        <div 
          v-if="fieldHasErrors" 
          class="mx-10 pb-2 mb-2 bg-red-lighter border-l-4 border-red"
        >
          <div class="messages pl-2 pt-2 tracking-tight leading-normal">
            <div class="font-bold text-xs uppercase">Error!</div>
            <div 
              v-for="(error,index) in errors" 
              :key="index" 
              class="font-thin text-xs"
            >
              {{ error }}
            </div>
          </div>
        </div>

        <div class="px-10 mb-10 pt-10 flex items-center justify-between">
          <button 
            type="button"  
            class="py-3 px-3 border  no-underline text-grey-lightest rounded bg-blue border-blue"
            @click="login()"
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

import { AuthConstants as AUTH_CONSTANT } from "../storage";
import { mapState } from "vuex";
import { UNAUTHENTICATE } from "../storage/auth";
import { Form } from "@/utilities";

export default {
  name: "Login",

  data() {
    return {
      form: new Form({ email: "", password: "" }),
      errors: []
    };
  },

  methods: {
    login() {
      this.$store
        .dispatch(`auth/${AUTH_CONSTANT.AUTHENTICATE}`, {
          password: this.form.password,
          email: this.form.email
        })
        .then(res => {
          this.form.reset();
          this.$router.push({
            name: "main",
            params: {
              account: this.user.account.type
            }
          });
        })
        .catch(err => {
          let errors = err.response.data.errors;
          let temp = [];

          for (let error in errors) {
            errors[error].forEach(element => {
              temp.push(element);
            });
          }

          this.errors = temp;
          this.form.reset();
        });
    }
  },

  computed: {
    fieldHasErrors() {
      return !!this.errors.length > 0 || !!Object.keys(this.errors).length > 0;
    },
    ...mapState("auth", {
      token: state => state.token
    }),
    ...mapState("user", {
      user: state => state.cur_user
    })
  },

  components: {
    FloatLabelInput
  }
};
</script>
