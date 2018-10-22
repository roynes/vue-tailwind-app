<template>
  <CustomForm 
    class="w-4/5 mx-auto"
    @first-button-click="add"
    @second-button-click="redirectToList"
  >
    <template slot="header">
      <h2>Add Group</h2>
    </template>

    <template slot="contents">
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
    </template>

    <template slot="first-button">
      Add
    </template>

    <template slot="second-button">
      Cancel
    </template>
  </CustomForm>
</template>

<script>
import { 
  TextInput, SelectOption,
  TextAreaInput, ImageFileInput,
  CustomForm
} from "@/components";

import { GroupService, StateService } from "@/services";
import { Form } from '@/utilities';

export default {
  components: {
    TextInput, SelectOption, 
    TextAreaInput, ImageFileInput,
    CustomForm
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
    },
    redirectToList() {
      this.$router.push({
        name: 'GroupList'
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