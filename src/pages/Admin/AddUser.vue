<template>
  <CustomForm 
    class="w-4/5 mx-auto"
    @first-button-click="add"
    @second-button-click="redirectToList"
  >
    <template slot="header">
      <h2>Add User</h2>
    </template>

    <template slot="contents">
      <TextInput 
        title="email" 
        label="Email" 
        placeholder="Service Email" 
        :errors="form.errors.email" 
        v-model="form.email"
      ></TextInput>

      <TextInput 
        title="name" 
        label="Name" 
        placeholder="Full name" 
        :errors="form.errors.name" 
        v-model="form.name"
      ></TextInput>

      <div class="pb-3 flex">
        <RadioInput
          title="role"
          label="Role"
          :errors="form.errors.role"
          :inputs="roles"
          v-model="form.role"
          class="w-1/3"
        ></RadioInput>

        <div class="w-2/3">
          <ListSingleRow
            class="pb-3"
            v-if="groupDomainChosen"
            label="Choose group"
            title="choose-group"
            :lists="groups"
            @click="assignGroup($event)"
            :chosen="form.group_id"
          ></ListSingleRow>

          <ListSingleRow
            class="pb-3"
            v-if="clientDomainChosen"
            label="Choose client"
            title="choose-client"
            :lists="clients"
            @click="assignClient($event)"
            :chosen="form.client_id"
          ></ListSingleRow>
        </div>
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
  GroupService, ClientService,
  UserService
} from "@/services";

import { 
  TextInput, RadioInput,
  ListSingleRow, CustomForm
} from "@/components";

import { Form } from '@/utilities';
import { roles } from "@/mixins";

export default {
  components: {
    TextInput,
    RadioInput,
    ListSingleRow,
    CustomForm
  },

  mixins: [ roles ],

  data() {
    return {
      form: new Form({
        email: '', name: '', role: '', 
        group_id: null, client_id: null,
      }),
      groups: [],
      clients: []
    };
  },

  computed: {
    hasAnyError() {
      return this.form.errors.hasAny();
    },
    border() {
      return this.hasAnyError ? 'border-red' : 'border-grey';
    },
    groupDomainChosen() {
      this.form.client_id = null;
      return !! (this.form.role == this.roles.GROUP_ADMIN || this.form.role == this.roles.GROUP_END_USER);
    },
    clientDomainChosen() {
      this.form.group_id = null;
      return !! (this.form.role === this.roles.CLIENT_ADMIN || this.form.role === this.roles.CLIENT_END_USER);
    }
  },

  methods: {
    add() {
      UserService.add(this.form.data())
        .then(res => {
          this.form.reset();
          this.$router.push({name: 'UsersList'});
        })
        .catch(err => {
          this.form.setErrors(err.response.data.errors);
        })
    },

    redirectToList() {
      this.$router.push({
        name: 'UsersList'
      });
    },

    assignClient(clientId) {
      this.form.client_id = clientId;
    },

    assignGroup(groupId) {
      this.form.group_id = groupId;
    }
  },

  mounted() {
    GroupService.all()
      .then(res => {
        this.groups = res.data.data;
      })
      .catch(err => console.log(err.response || err));

    ClientService.all()
      .then(res => {
        this.clients = res.data.clients;
      })
      .catch(err => console.log(err.response || err));
  }
}
</script>