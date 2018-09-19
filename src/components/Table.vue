<template>
  <div class="w-full">
    <div class="my-6 max-h-168 rounded border shadow-md">
      <div class="table-name flex items-center pb-4">
        <div class="py-3 px-2 -mt-4 text-white bg-purple-dark rounded shadow ml-4">
          <slot name="icon"></slot>
        </div>
        <div class="ml-4">
          <slot name="title"></slot>
        </div>
        <div class="flex items-center justify-end w-full px-6">
          <slot name="title-option"></slot>
        </div>
      </div>

      <div name="header" class="header w-full grid grid-columns-12 flex py-2 items-center font-semibold grid-gap-2">
        <slot name="headers"></slot>
      </div>

      <div class="contents mx-1">
        <slot name="contents"></slot>
      </div>

      <div class="footer w-full flex h-16 justify-between items-center text-sm font-thin px-6 py-2">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
const header = {
  title: String,
  class: String
};

export default {
  name: "Table"
};
</script>
