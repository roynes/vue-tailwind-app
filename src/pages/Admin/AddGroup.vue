<template>

  <div class="w-4/5 mx-auto">
  <!-- continue editing -->
    <div class="flex flex-col shadow-md border rounded-t bg-white">
      <div class="p-4 py-6 flex items-center">
        <h2>Add Group</h2>
      </div>

      <div class="outline-none px-4 pb-6">
        <div class="pb-3">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
            Name
          </label>
          <input class="appearance-none block w-full bg-white text-grey-darker border border-red rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-grey-lighter" id="grid-first-name" type="text" placeholder="Group name">
          <!-- <p class="text-red text-xs italic">Please fill out this field.</p> -->
        </div>

        <div class="pb-3">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
            Street
          </label>
          <input class="appearance-none block w-full bg-white text-grey-darker border border-red rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-grey-lighter" id="grid-first-name" type="text" placeholder="Street name">
          <p class="text-red text-xs italic">Please fill out this field.</p>
        </div>

        <div class="flex -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
              City
            </label>
            <input class="appearance-none block w-full bg-white text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-grey-lighter focus:border-grey" id="grid-city" type="text" placeholder="Sydney">
          </div>

          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
              State
            </label>
            <div class="relative">
              <select class="block appearance-none w-full bg-white border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-grey-lighter focus:border-grey" id="grid-state">
                <option>New Mexico</option>
                <option>Missouri</option>
                <option>Texas</option>
              </select>
              <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
              Zip
            </label>
            <input class="appearance-none block w-full bg-white text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-grey-lighter focus:border-grey" id="grid-zip" type="text" placeholder="90210">
          </div>
        </div>

        <div class="mt-6">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="description">
            Description
          </label>
          <textarea name="description" id="description" class="focus:outline-none rounded w-full focus:bg-grey-lighter bg-white h-48 p-2" placeholder="Write description here..."></textarea>
        </div>
      </div>

      <div class="px-4 py-4 flex items-center">
        <div class="p-3 w-32 rounded bg-blue text-center text-white mr-4">Add</div>
        <div class="p-3 w-32 rounded bg-blue text-center text-white">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form } from '@/utilities';
import { FloatLabelInput } from "@/components";

export default {
  components: {
    FloatLabelInput
  },
  
  data() {
    return {
      form: new Form()
    };
  }
}
</script>

<style lang="scss" scoped>
.shadow-lite {
  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, .12), 0 -2px 4px 0 rgba(0, 0, 0, .12);
}
</style>
