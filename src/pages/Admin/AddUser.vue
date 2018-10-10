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
              <p class="text-red text-xs italic" v-for="(val, index) in form.errors.name" :key="index">{{ val }}</p>
            </div>
          </div>

          <div class="w-2/3">
            <div class="pb-3" v-if="groupDomainChosen">
              <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-service-email">
                Group
              </label>
              <div class="relative">
                <select 
                  class="block appearance-none w-full bg-white border border-grey text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-grey-lighter focus:border-grey"
                  id="grid-state"
                  v-model="form.group"
                >
                  <option :value="group.id" v-for="(group, index) in groups" :key="index">{{group.name}}</option>
                </select>
                <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              <div v-if="form.errors.hasAny()">
                <p class="text-red text-xs italic" v-for="(val, index) in form.errors.email" :key="index">{{ val }}</p>
              </div>
            </div>

            <div class="pb-3" v-if="clientDomainChosen">
              <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-service-email">
                Client
              </label>
              <div class="relative">
                <select 
                  class="block appearance-none w-full bg-white border border-grey text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-grey-lighter focus:border-grey"
                  id="grid-state"
                  v-model="form.client"
                >
                  <option :value="client.id" v-for="(client, index) in clients" :key="index">{{client.name}}</option>
                </select>
                <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              <div v-if="form.errors.hasAny()">
                <p class="text-red text-xs italic" v-for="(val, index) in form.errors.email" :key="index">{{ val }}</p>
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
import { GroupService, ClientService } from "@/services";
import { roles } from "@/mixins";
import { Form } from '@/utilities';

export default {
  mixins: [ roles ],

  data() {
    return {
      form: new Form({
        name: '', role: '', group: 0, client: 0
      }),
      logoAvailable: false,
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
      return !! (this.form.role == this.roles.GROUP_ADMIN || this.form.role == this.roles.GROUP_END_USER);
    },
    clientDomainChosen() {
      return !! (this.form.role === this.roles.CLIENT_ADMIN || this.form.role === this.roles.CLIENT_END_USER);
    }
  },

  methods: {
    add() {
      
    }
  },

  mounted() {
    GroupService.all()
      .then(res => {
        this.groups = res.data.data;
        this.form.group = this.groups[0].id;
      })
      .catch(err => console.log(err.response || err));

    ClientService.all()
      .then(res => {
        this.clients = res.data.data;
        this.form.client = this.clients[0].id
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
    @apply text-grey-dark px-2 
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