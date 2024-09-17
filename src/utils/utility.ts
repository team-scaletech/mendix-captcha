import CryptoJS from "crypto-js";
export const generateRandomString = (length = 16) =>
  [...Array(length)].map(() => Math.random().toString(36)[2]).join("");

export const generateRandomInt = (max: number) =>
  Math.floor(Math.random() * max);

export const sha256Hex = (data: string | CryptoJS.lib.WordArray) =>
  CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);

export const hmacSha256Hex = (
  data: string | CryptoJS.lib.WordArray,
  key: string | CryptoJS.lib.WordArray
) => CryptoJS.HmacSHA256(data, key).toString(CryptoJS.enc.Hex);
