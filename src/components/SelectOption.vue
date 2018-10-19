<template>
  <div>
    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" :for="title">
      {{ label}}
    </label>
    <div class="relative">
      <select 
        class="block appearance-none w-full bg-white border border-grey text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-grey-lighter focus:border-grey" 
        :id="title"
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
</template>

<script>
export default {
  // Continue refactoring here...
}
</script>

