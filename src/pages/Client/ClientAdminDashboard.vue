<template>
  <div class="main-contents">
    <div class="flex items-center mb-4 w-1/2 mx-auto text-white">
      <router-link :to="{ name: 'UsersList' }" tag="div" class="flex-1 h-48 m-2 flex border rounded-lg bg-blue-dark hover:bg-blue-light shadow-md cursor-pointer">
        <div class="w-1/2 h-full text-center text-5xl flex items-center justify-center ">
          <i class="fas fa-users fa-2x"></i>
        </div>
        <div class="w-1/2 pl-6 flex flex-col justify-center">
          <h1 class="w-full">Users</h1>
          <h3 class="w-full">List</h3>
        </div>
      </router-link>
    </div>
  </div>
</template>


<script>
export default {
  name: "ClientAdminDashboard"
};
</script>
