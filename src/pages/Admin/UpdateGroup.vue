<template>
  <CustomForm
    class="w-4/5 mx-auto"
    @first-button-click="update"
    @second-button-click="redirectToList"
  >
    <template slot="header">
      <h2>Update Group</h2>
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
import { Form } from '@/utilities';

import { 
  TextInput, SelectOption,
  TextAreaInput, ImageFileInput,
  CustomForm
} from "@/components";

import { 
  GroupService, StateService
} from "@/services";

export default {
  components: {
    TextInput, SelectOption, 
    TextAreaInput, ImageFileInput,
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
      form: new Form(this.input),
      states: []
    }
  },

  methods: {
    update() {

    }
  }
}
</script>
