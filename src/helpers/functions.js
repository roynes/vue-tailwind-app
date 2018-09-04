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
