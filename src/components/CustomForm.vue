<template>
  <div>
    <div class="flex flex-col shadow-md border rounded-t bg-white">
      <div class="p-4 py-6 flex items-center">
        <slot name="header"></slot>
      </div>

      <div class="outline-none px-4 pb-6">
        <slot name="contents"></slot>
      </div>

      <div class="px-4 py-4 flex items-center">
        <div 
          class="p-3 w-32 rounded bg-blue text-center text-white mr-4 cursor-pointer"
          @click="$emit('first-button-click')"
        >
          <slot name="first-button"></slot>
        </div>
        <div 
          class="p-3 w-32 rounded bg-blue text-center text-white mr-4 cursor-pointer"
          @click="$emit('second-button-click')"
        >
          <slot name="second-button"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
