<template>

  <div class="w-4/5 mx-auto">
    <div class="flex flex-col shadow-md border rounded-t bg-white">
      <div class="p-4 py-6 flex items-center">
        <h2>Add User</h2>
      </div>

      <div class="outline-none px-4 pb-6">
        <div class="pb-3">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
            Name
          </label>
          <input 
            class="appearance-none block w-full bg-white text-grey-darker border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-grey-lighter" 
            id="grid-first-name" 
            type="text" 
            placeholder="User name"
            v-model="form.name"
            :class="border"
          >
          <div v-if="form.errors.hasAny()">
            <p class="text-red text-xs italic" v-for="(val, index) in form.errors.name" :key="index">{{ val }}</p>
          </div>
        </div>

        <div class="pb-3">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
            Role
          </label>
          <div v-for="(role, index) in roles" :key="index">
            <input type="radio" :id="`rb-${index}`" name="rb-role">
            <label :for="`rb-${index}`">{{ role.replace(/\W+/g, ' ') }}</label>
          </div>
          <div v-if="form.errors.hasAny()">
            <p class="text-red text-xs italic" v-for="(val, index) in form.errors.name" :key="index">{{ val }}</p>
          </div>
        </div>

        <div class="pb-3">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-service-email">
            Service Email
          </label>
          <input 
            class="appearance-none block w-full bg-white text-grey-darker border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-grey-lighter" 
            id="grid-service-email" 
            type="text" 
            placeholder="Service email / Email  "
            v-model="form.email"
            :class="border"
          >
          <div v-if="form.errors.hasAny()">
            <p class="text-red text-xs italic" v-for="(val, index) in form.errors.email" :key="index">{{ val }}</p>
          </div>
        </div>

        <div class="flex -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label 
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" 
              for="grid-city"
            >
              City
            </label>
            <input 
              class="appearance-none block w-full bg-white text-grey-darker border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-grey-lighter focus:border-grey" 
              id="grid-city" 
              type="text" 
              placeholder="City"
              v-model="form.city"
              :class="border"
            >
            <div v-if="form.errors.hasAny()">
              <p class="text-red text-xs italic mt-3" v-for="(val, index) in form.errors.city" :key="index">{{ val }}</p>
            </div>
          </div>

          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
              State
            </label>
            <div class="relative">
              <select 
                class="block appearance-none w-full bg-white border border-grey text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-grey-lighter focus:border-grey" 
                id="grid-state"
                v-model="form.state"
              >
                <option :value="state.abbr" v-for="(state, index) in states" :key="index">{{state.name}}</option>
              </select>
              <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            <div v-if="form.errors.hasAny()">
              <p class="text-red text-xs italic mt-3" v-for="(val, index) in form.errors.state" :key="index">{{ val }}</p>
            </div>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
              Zip
            </label>
            <input 
              class="appearance-none block w-full bg-white text-grey-darker border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-grey-lighter focus:border-grey" 
              id="grid-zip" 
              type="text" 
              placeholder="Zip code"
              v-model="form.zip_code"
              :class="border"
            >
            <div v-if="form.errors.hasAny()">
              <p class="text-red text-xs italic mt-3" v-for="(val, index) in form.errors.zip_code" :key="index">{{ val }}</p>
            </div>
          </div>
        </div>

        <div class="mt-6 flex">
          <div class="w-1/2 mr-1">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="description">
              Description
            </label>
            <textarea 
              name="description" 
              id="description" 
              class="focus:outline-none rounded w-full focus:bg-grey-lighter bg-white h-48 p-2 border max-h-120 border-grey" 
              placeholder="Write description here..."
              v-model="form.description"
            />
          </div>

          <div class="w-1/2 flex flex-col ml-1">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Logo
            </label>
            <div class="w-full rounded border h-48 max-h-48 flex items-center justify-center bg-grey-light flex-col relative border-grey">
              <div v-show="!logoAvailable" class="tracking-wide uppercase absolute">
                Click to upload logo
              </div>

              <img v-show="logoAvailable" class="absolute" ref="groupLogo">

              <input 
                type="file" 
                name="logo" 
                id="logo"
                class="opacity-0 w-full h-full"
                @change="readFile"
              >              
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 py-4 flex items-center">
        <div 
          class="p-3 w-32 rounded bg-blue text-center text-white mr-4 cursor-pointer"
          @click="add"
        >
          Add
        </div>
        <router-link 
          :to="{name: 'GroupList'}" 
          class="p-3 w-32 rounded bg-blue text-center text-white cursor-pointer"
          tag="div"
        >
          Cancel
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { GroupService, StateService } from "@/services";
import { roles } from "@/mixins";
import { Form } from '@/utilities';

export default {
  mixins: [ roles ],

  data() {
    return {
      form: new Form({
        logo: '', name: '', street: '',
        city: '', state: '', zip_code: '',
        email: '',
        description: ''
      }),
      logoAvailable: false,
      states: []
    };
  },

  computed: {
    hasAnyError() {
      return this.form.errors.hasAny();
    },
    border() {
      return this.hasAnyError ? 'border-red' : 'border-grey';
    }
  },

  methods: {
    readFile(event) {
      let reader = new FileReader();

      reader.onload = e => {
        this.logoAvailable = true;
        this.$refs.groupLogo.setAttribute('src', e.target.result);

        this.form.logo = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    },

    add() {
      GroupService.add(this.form.data()).then(resp => {
        this.logoAvailable = false;
        this.$refs.groupLogo.setAttribute('src', null);
        this.form.reset();
      }).catch(err => {
        this.form.setErrors(err.response.data.errors);
      });
    }
  },

  mounted() {
    StateService.fetchAll()
      .then(resp => {
        this.states = resp.data.states;
        this.form.state = this.states[0].abbr;
      });
  }
}
</script>