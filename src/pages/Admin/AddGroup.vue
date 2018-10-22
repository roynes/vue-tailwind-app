<template>
  <div class="w-4/5 mx-auto">
    <div class="flex flex-col shadow-md border rounded-t bg-white">
      <div class="p-4 py-6 flex items-center">
        <h2>Add Group</h2>
      </div>

      <div class="outline-none px-4 pb-6">
        <TextInput 
          title="name" 
          label="Name" 
          placeholder="Group name" 
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

          <SelectOption
            title="state"
            label="State"
            :lists="mappedState"
            v-model="form.state"
            class="w-full md:w-1/3 px-3 mb-6 md:mb-0"
          ></SelectOption>

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
          <TextAreaInput
            class="w-1/2 mr-1"
            title="description"
            label="Description"
            v-model="form.description"
            name="description"
          ></TextAreaInput>

          <ImageFileInput
            title="logo"
            label="Logo"
            class="w-1/2 ml-1"
            v-model="form.logo"
            ref="imgFileInput"
          ></ImageFileInput>
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
import { 
  TextInput, SelectOption,
  TextAreaInput, ImageFileInput 
} from "@/components";

import { GroupService, StateService } from "@/services";
import { Form } from '@/utilities';

export default {
  components: {
    TextInput, SelectOption, 
    TextAreaInput, ImageFileInput
  },
  
  data() {
    return {
      form: new Form({
        logo: '', name: '', street: '',
        city: '', state: '', zip_code: '',
        email: '', description: ''
      }),
      states: []
    };
  },

  computed: {
    mappedState() {
      return this.states.map(state => {
        return {
          id : state.abbr,
          name: state.name
        };
      });
    }
  },

  methods: {
    add() {
      GroupService.add(this.form.data())
      .then(resp => {
        this.$refs.imgFileInput.reset();
        this.form.reset();
        this.$router.push({
          name: "GroupList",
        });
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