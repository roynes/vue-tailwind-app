export const roles = {
  data() {
    return {
      roles: {
        SUPER_ADMIN: "super-admin",
        GROUP_ADMIN: "group-admin",
        CLIENT_ADMIN: "client-admin",
        GROUP_END_USER: "group-end-user",
        CLIENT_END_USER: "client-end-user"
      },
      domain: {
        group: "group",
        client: "client",
        user: "user"
      }
    };
  }
};
