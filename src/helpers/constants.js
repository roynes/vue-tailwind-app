export const salt = process.env.VUE_APP_SALT;
export const baseUri = process.env.VUE_APP_API_BASE_URI;

export const tokenAlias = btoa(`token`);
export const tokenExpAlias = btoa(`token_exp`);
export const userAlias = btoa("cur_user");
export const permissionAlias = btoa(`permission`);
export const roleAlias = btoa(`role`);
