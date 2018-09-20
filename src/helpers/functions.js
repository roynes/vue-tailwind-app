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

  localStorage.setItem(Default.userAlias, t);
}

export function setPermissions(permissions = []) {
  localStorage.setItem(Default.permissionAlias, permissions.toString());
}

export function setRoles(roles = []) {
  localStorage.setItem(Default.roleAlias, roles.toString());
}

export function toCamelCase(val = "", toPascalCase = false) {
  return val
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return !toPascalCase && index == 0
        ? letter.toLowerCase()
        : letter.toUpperCase();
    })
    .replace(/[-\s]/g, "");
}

export function getToken() {
  return localStorage.getItem(Default.tokenAlias) || "";
}

export function getTokenExpiration() {
  return parseInt(localStorage.getItem(Default.tokenExpAlias)) || 0;
}

export function getUser() {
  return JSON.parse(localStorage.getItem(Default.userAlias)) || {};
}

export function getPermission() {
  return localStorage.getItem(Default.permissionAlias) || "";
}

export function getRole() {
  return localStorage.getItem(Default.roleAlias) || "";
}