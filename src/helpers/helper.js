import moment from "moment";
import * as Cookies from "js-cookie";

/**
 *  Set cookie item with time stamp
 */
export function setCookie(name, value, expires) {
  // Set default expiration to 1 hour if undefined or null
  if (expires === undefined || expires === "null") {
    expires = 7;
  }
  Cookies.set(name, value, { expires: expires });
}

/**
 * Remove cookie item and time stamp
 */
export function removeCookie(name) {
  Cookies.remove(name);
}

/**
 *  Check the expiration status of a cookie item
 */
export function statusCookie(name) {
  let status = Cookies.get(name);
  if (status) {
    return true;
  } else {
    return false;
  }
}

export function redirectTo(url) {
  window.location = url;
}

/**
 *  validateEmail
 *  Check if an email address is valid
 *
 *  param { email } string
 */
export function validateEmail(email) {
  // const regex = /^(([^<>()\[\]\\.,\s@"]+(\.[^<>()\[\]\\.,:s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return regex.test(email)
}

/**
 * method to validate vocal letter and length
 * check if the string has vocal letter
 * @param {Stirng} inputString
 * @param {Int} length default = 3
 *
 * @return {Boolean}
 */
export function validateVocalLetter(inputString, length = 3) {
  return (
    inputString.length >= length && /[aiueoAIUEO]/.test(inputString.trim())
  );
}

/**
 * method to validate numbers and length
 * check if the string just numbers
 * @param {Stirng} inputString
 * @param {Int} length default = 3
 *
 * @return {Boolean}
 */
export function validateNumber(inputNumber, length = 3) {
  return /^[0-9]+$/.test(inputNumber.trim()) && inputNumber.length >= length;
}

/**
 * validate phone number format
 * @param {String} phoneNumber
 *
 * @return {Boolean}
 */
export function validatePhoneNumber(phoneNumber) {
  return /(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/.test(
    phoneNumber
  );
}

/**
 * function to uppercase first letter
 * @param {String} str 'hello'
 *
 * @return {Srring} 'Hello'
 */
export function uppercaseFirst(str = "undefined") {
  if (!str) {
    return "";
  }
  const words = str.split(" ");
  return words
    .map(word => {
      if (!word) {
        return "";
      }
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * validate time departure and arrival
 * @param {Date} departure
 * @param {Date} arrival
 */
export function validateTime(departure, arrival) {
  return (
    parseFloat(moment(departure).format("x")) <
    parseFloat(moment(arrival).format("x"))
  );
}

/**
 * validate time departure and arrival
 * @param {File} string
 * @param {RegEx} cutomRegex
 */
export function validateRegex(string, customRegex) {
  const regex =
    customRegex || /(\.jpeg\.|pdf|\.png|\.jpg|\.JPG|\.JPEG|\.PNG|\.PDF)/g;
  return regex.test(string);
}
