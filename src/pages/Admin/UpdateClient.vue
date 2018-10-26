<template>
  <CustomForm
    class="w-4/5 mx-auto"
    @first-button-click="update"
    @second-button-click="redirectToList"
  >
    <template slot="header">
      <h2>Update Client</h2>
    </template>

    <template slot="contents">
      <TextInput 
        title="name" 
        label="Name" 
        :placeholder="input.name"
        :errors="form.errors.name" 
        v-model="form.name"
      ></TextInput>

      <TextInput 
        title="street" 
        label="Street" 
        :placeholder="input.street" 
        :errors="form.errors.street" 
        v-model="form.street"
      ></TextInput>

      <TextInput 
        title="email" 
        label="Email" 
        :placeholder="input.email" 
        :errors="form.errors.email" 
        v-model="form.email"
      ></TextInput>

      <div class="flex -mx-3 mb-2">
        <TextInput
          class="w-full md:w-1/3 px-3 mb-6 md:mb-0"
          title="city"
          label="City"
          :placeholder="input.city" 
          :errors="form.errors.city"
          v-model="form.city"
        ></TextInput>

        <SelectOption
          title="state"
          label="State"
          placeholder="Choose option deez nuts what the heck is this deeez?"
          :lists="mappedState"
          :chosen="chosenState"
          @click="setState($event)"
          class="w-full md:w-1/3 px-3 mb-6 md:mb-0"
        ></SelectOption>

        <TextInput
          class="w-full md:w-1/3 px-3 mb-6 md:mb-0"
          title="zip-code"
          label="Zip"
          :placeholder="input.zip_code" 
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
          :imgSrc="input.logo"
          v-model="form.logo"
          ref="imgFileInput"
        ></ImageFileInput>
      </div>
    </template> 

    <template slot="first-button">
      Update
    </template>

    <template slot="second-button">
      Cancel
    </template>
  </CustomForm>
</template>

<script>
import { Form } from "@/utilities";

import {
  TextInput,
  SelectOption,
  TextAreaInput,
  ImageFileInput,
  CustomForm
} from "@/components";

import { GroupService, StateService } from "@/services";

export default {
  components: {
    TextInput,
    SelectOption,
    TextAreaInput,
    ImageFileInput,
    CustomForm
  },

  props: {
    input: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      form: new Form({
        logo: "",
        name: "",
        street: "",
        city: "",
        state: "",
        zip_code: "",
        email: "",
        description: ""
      }),
      states: []
    };
  },

  methods: {
    update() {},

    redirectToList() {
      this.$router.push({
        name: "ClientList"
      });
    },

    setState(value) {
      this.form.state = value;
    }
  },

  computed: {
    mappedState() {
      return this.states.map(state => {
        return {
          id: state.abbr,
          name: state.name
        };
      });
    },
    chosenState() {
      return this.states.find(el => {
        return el.abbr === this.input.state;
      });
    }
  },

  mounted() {
    StateService.fetchAll().then(resp => {
      this.states = resp.data.states;
    });

    console.log(this.input, this.form);
  }
};
</script>
