import * as Default from "./constants";

export function setToken(token = "") {
  localStorage.setItem(Default.tokenAlias, token);
}

export function unsetToken() {
  localStorage.removeItem(Default.tokenAlias);
}

export function setTokenExpiry(expiryDate = 30) {
  localStorage.setItem(Default.tokenExpAlias, expiryDate);
}

export function setUser(user = {}) {
  let t = JSON.stringify(user);
  console.log('parsed user', JSON.parse(t));

  localStorage.setItem(Default.userAlias, t);
}

export function setPermissions(permissions = []) {
  localStorage.setItem(Default.permissionAlias, permissions.toString());
}

export function setRoles(roles = []) {
  localStorage.setItem(Default.roleAlias, roles.toString());
}