<template>
  <div class="main-contents">
    <div class="flex items-center mb-4 w-full text-white">
      <router-link :to="{ name: 'UsersList' }" tag="div" class="flex-1 xl:h-48 lg:h-40 md:h-24 xl:m-2 md:m-1 flex border rounded-lg bg-blue-dark hover:bg-blue-light shadow-md cursor-pointer">
        <div class="w-1/2 h-full text-center flex items-center justify-center ">
          <p class="fas fa-users xl:text-10xl lg:text-8xl md:text-5xl"></p>
        </div>
        <div class="w-1/2 xl:pl-6 lg:pl-2 flex flex-col justify-center">
          <p class="w-full lg:text-3xl md:text-2xl font-semibold">Users</p>
          <p class="w-full md:text-xl">List</p>
        </div>
      </router-link>

      <router-link :to="{ name: 'ClientList' }" tag="div" class="flex-1 xl:h-48 lg:h-40 md:h-24 xl:m-2 md:m-1 flex border rounded-lg bg-blue-dark hover:bg-blue-light shadow-md cursor-pointer">
        <div class="w-1/2 h-full text-center flex items-center justify-center ">
          <i class="fas fa-users xl:text-10xl lg:text-8xl md:text-5xl"></i>
        </div>
        <div class="w-1/2 xl:pl-6 lg:pl-2 flex flex-col justify-center">
          <p class="w-full lg:text-3xl md:text-2xl font-semibold">Clients</p>
          <p class="w-full md:text-xl">List</p>
        </div>
      </router-link>
      
      <router-link :to="{ name: 'GroupList' }" tag="div" class="flex-1 xl:h-48 lg:h-40 md:h-24 xl:m-2 md:m-1 flex border rounded-lg bg-blue-dark hover:bg-blue-light shadow-md cursor-pointer">
        <div class="w-1/2 h-full text-center flex items-center justify-center ">
          <i class="fas fa-users xl:text-10xl lg:text-8xl md:text-5xl"></i>
        </div>
        <div class="w-1/2 xl:pl-6 lg:pl-2 flex flex-col justify-center">
          <p class="w-full lg:text-3xl md:text-2xl font-semibold">Groups</p>
          <p class="w-full md:text-xl">List</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
