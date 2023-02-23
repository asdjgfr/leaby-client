export const usernamePattern = /^[\w-]{4,16}$/;
export const passwordPattern =
  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z$@!%*#?&]{6,20}$/;
export const isTimeout = /^timeout of.+exceeded$/;
