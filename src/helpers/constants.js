export const salt = process.env.VUE_APP_SALT;
export const baseUri = process.env.VUE_APP_API_BASE_URI;

export const tokenAlias = btoa(`token`);
export const token = localStorage.getItem(tokenAlias) || "";

export const tokenExpAlias = btoa(`token_exp`);
export const tokenExpiration = localStorage.getItem(tokenExpAlias) || 0;

export const userAlias = btoa("cur_user");
export const user = JSON.parse(localStorage.getItem(userAlias)) || {};

export const permissionAlias = btoa(`permission`);
export const permission = localStorage.getItem(permissionAlias)|| ""; 

export const roleAlias = btoa(`role`);
export const role = localStorage.getItem(roleAlias) || "";

