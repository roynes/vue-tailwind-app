<template>

  <div class="w-4/5 mx-auto">
    <div class="flex flex-col shadow-md border rounded-t bg-white">
      <div class="p-4 py-6 flex items-center">
        <h2>Add Client</h2>
      </div>

      <div class="outline-none px-4 pb-6">
        <TextInput 
          title="name" 
          label="Name" 
          placeholder="Full name" 
          :errors="form.errors.name" 
          v-model="form.name"
        ></TextInput>

        <TextInput 
          title="street" 
          label="Street" 
          placeholder="Street name" 
          :errors="form.errors.street" 
          v-model="form.street"
        ></TextInput>

        <TextInput 
          title="email" 
          label="Email" 
          placeholder="Service email / Email" 
          :errors="form.errors.email" 
          v-model="form.email"
        ></TextInput>

        <div class="flex -mx-3 mb-2">
          <TextInput
            class="w-full md:w-1/3 px-3 mb-6 md:mb-0"
            title="city"
            label="City"
            placeholder="City"
            :errors="form.errors.city"
            v-model="form.city"
          ></TextInput>

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

          <TextInput
            class="w-full md:w-1/3 px-3 mb-6 md:mb-0"
            title="zip-code"
            label="Zip"
            placeholder="Zip"
            :errors="form.errors.zip_code"
            v-model="form.zip_code"
          ></TextInput>
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

              <img v-show="logoAvailable" class="absolute" ref="clientLogo">

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
          :to="{name: 'ClientList'}" 
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
import { TextInput } from "@/components";
import { ClientService, StateService } from "@/services";
import { Form } from '@/utilities';

export default {
  components: {
    TextInput
  },
  
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
      ClientService
        .add(this.form.data())
        .then(resp => {
          this.logoAvailable = false;
          this.$refs.clientLogo.setAttribute('src', null);
          this.form.reset();
        })
        .catch(err => {
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