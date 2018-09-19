import * as Default from "./constants";

export function setToken(token = "") {
  localStorage.setItem(Default.tokenAlias, token);
}

export function setLoginAsToken(token = "") {
  localStorage.setItem(Default.loginAstokenAlias, token);
}

export function unsetLoginAsToken() {
  localStorage.removeItem(Default.loginAstokenAlias);
}

export function unsetToken() {
  localStorage.removeItem(Default.tokenAlias);
}

export function setTokenExpiry(expiryDate = 30) {
  localStorage.setItem(Default.tokenExpAlias, expiryDate);
}

export function setUser(user = {}) {
  let t = JSON.stringify(user);
  console.log("parsed user", JSON.parse(t));

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
