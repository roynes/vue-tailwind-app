<template>
  <div class="w-4/5 mx-auto">
    <div class="flex flex-col shadow-md border rounded-t bg-white">
      <div class="p-4 py-6 flex items-center">
        <h2>Add User</h2>
      </div>

      <div class="outline-none px-4 pb-6">
        <div class="pb-3">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
            Email
          </label>
          <input 
            class="appearance-none block w-full bg-white text-grey-darker border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-grey-lighter" 
            id="grid-first-name" 
            type="text" 
            placeholder="Service email"
            v-model="form.email"
            :class="border"
          >
          <div v-if="form.errors.hasAny()">
            <p class="text-red text-xs italic" v-for="(val, index) in form.errors.email" :key="index">{{ val }}</p>
          </div>
        </div>

        <div class="pb-3">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
            Name
          </label>
          <input 
            class="appearance-none block w-full bg-white text-grey-darker border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-grey-lighter" 
            id="grid-first-name" 
            type="text" 
            placeholder="Full name"
            v-model="form.name"
            :class="border"
          >
          <div v-if="form.errors.hasAny()">
            <p class="text-red text-xs italic" v-for="(val, index) in form.errors.name" :key="index">{{ val }}</p>
          </div>
        </div>

        <div class="pb-3 flex">
          <div class="w-1/3">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
              Role
            </label>
            <div class="flex flex-col mb-2 justify-center w-full items-start">
              <div v-for="(role, index) in roles" :key="index" class="flex items-center">
                <input type="radio" :id="`rb-${index}`" name="rb-role" :value="role" v-model="form.role">
                <label :for="`rb-${index}`" class="role-label">{{ role.replace(/\W+/g, ' ') }}</label>
              </div>
            </div>
            <div v-if="form.errors.hasAny()">
              <p class="text-red text-xs italic" v-for="(val, index) in form.errors.role" :key="index">{{ val }}</p>
            </div>
          </div>

          <div class="w-2/3">
            <div 
              class="pb-3 flex flex-col"
              v-if="groupDomainChosen"
            >
              <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-client">
                Choose group
              </label>
              <div class="border h-40 rounded p-1 overflow-y-auto text-center">
                <div 
                  class="rounded hover:bg-blue-lighter p-1 my-1 hover:font-semibold"
                  v-for="(group, index) in groups"
                  :key="index"
                  @click="assignGroup(group.id)"
                  :class="[ form.group_id === group.id ? 'bg-blue text-white' : '' ]"
                >
                  {{group.name}}
                </div>
              </div>
            </div>

            <div 
              class="pb-3 flex flex-col"
              v-if="clientDomainChosen"
            >
              <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-client">
                Choose client
              </label>
              <div class="border h-40 rounded p-1 overflow-y-auto text-center">
                <div 
                  class="rounded p-1 my-1 hover:font-semibold"
                  v-for="(client, index) in clients"
                  :key="index"
                  @click="assignClient(client.id)"
                  :class="[ form.client_id === client.id ? 'bg-blue text-white hover:bg-blue' : 'hover:bg-blue-lighter' ]"
                >
                  {{client.name}}
                </div>
              </div>
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
          :to="{name: 'UsersList'}" 
          class="p-3 w-32 rounded bg-red text-center text-white cursor-pointer"
          tag="div"
        >
          Cancel
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { GroupService, ClientService, UserService } from "@/services";
import { roles } from "@/mixins";
import { Form } from '@/utilities';

export default {
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
        .then(res => console.log(res))
        .catch(err => {
          this.form.setErrors(err.response.data.errors);
        })
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

<style lang="scss" scoped>

@tailwind utilities;

input[type='radio'] {
  height: 0.1px;
  width: 0.1px;
  opacity: 0;

  &:checked + label.role-label {
    @apply text-black px-2 
  }

  &:checked + label.role-label::before {
    @apply w-full h-full mt-0 z-n1
  }
}

label.role-label {
  @apply leading-loose capitalize relative cursor-pointer inline-block px-5 z-top;
}

label.role-label::before {
  content: ' ';
  @apply absolute block rounded-full w-4 h-4  mt-2 pin-l border border-orange-lighter bg-orange-lighter;
}

label.role-label,
label.role-label::before {
  -webkit-transition: .25s all ease;
  -o-transition: .25s all ease;
  transition: .25s all ease;
}

</style>