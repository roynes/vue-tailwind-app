<template>
  <!-- login pane -->
  <div class="login bg-grey-lightest">
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
import { Form } from "../utilities";
import {
  AuthConstants as AUTH_CONSTANT,
  UserConstants as USER_CONSTANTS
} from "../storage";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: new Form({ email: "", password: "" })
    };
  },
  methods: {
    ...mapMutations("auth", {
      updateToken(commit, token = "") {
        commit(AUTH_CONSTANT.UPDATE_TOKEN);
      },

      setCurUser(commit, user = {}) {
        commit(USER_CONSTANTS.SET_CUR_USER);
      }
    }),
    ...mapActions("auth", {
      login(dispatch) {
        dispatch(AUTH_CONSTANT.AUTHENTICATE, {
          email: this.form.email,
          password: this.form.password
        }).then(() => {
          this.getCurUser()
            .then(() => {
              this.form.reset();
              this.$router.push({
                path: '/:account/dashboard',
                params: {
                  account: this.currentUser.account.type
                }
              })
            });
        }).catch(err => {
          console.log(err)
          this.updateToken();
          this.$router.push("/login");
        });
      }
    }),
    ...mapActions("user", {
      getCurUser(dispatch) {
        let jwtToken = this.token;
        let payload = atob(this.token.split('.')[1]);
        let subject = JSON.parse(payload).sub;

        return dispatch(USER_CONSTANTS.GET_CUR_USER, subject);
      }
    })
  },
  computed: {
    fieldHasErrors() {
      return this.errors.items.length >= 1;
    },
    ...mapState("auth", {
      token: state => state.token
    }),
    ...mapState("user", {
      currentUser: state => state.cur_user
    })
  },
  components: {
    FloatLabelInput
  }
};
</script>
