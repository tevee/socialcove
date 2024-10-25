// The Header class create the site header
//
// This class is promarily used by the PageLayout module
//
// - create method: Returns DOM for the header with logged in user info
//
// The class automatically adds logged in user info to the profile menu
// and manages the log out and delete account functionalities 
// 

import * as template from "./templates/main-header.js";
import { replace, stringToDOM } from "../../utilities/templateUtils.js";
import {
  filterCookieValue,
  deleteCookie,
} from "../../utilities/cookieUtils.js";
import * as api from "../../api.js";
import UserProfile from "./UserProfile.js";

export default class Header {
  static create() {
    const headerTemplate = template.header;

    const header = stringToDOM(headerTemplate);

    const user = UserProfile.createProfileImg(
      filterCookieValue("userimage", "user")
    );

    header.querySelector("nav").append(user);

    user.addEventListener("click", toggleUserProfileMenu);

    return header;
  }
}

function toggleUserProfileMenu(): void {
  const profileMenu = document.querySelector(".profile-menu") as HTMLElement;

  if (profileMenu) {
    profileMenu.remove();
  } else {
    document.body.append(userProfileMenu());
  }
}

function userProfileMenu(): HTMLElement {
  let menuTemplate = template.profileMenu;

  const menuDOM = stringToDOM(menuTemplate);

  const userPreview = UserProfile.createPreview(
    filterCookieValue("username", "user"),
    filterCookieValue("userimage", "user")
  );

  menuDOM.prepend(userPreview);

  menuDOM
    .querySelector("button#log-out")
    .addEventListener("click", promptLogOut);
  menuDOM
    .querySelector("button#delete-account")
    .addEventListener("click", promptDeleteAccount);

  return menuDOM;
}

function promptLogOut() {
  const prompt = "Are you sure you want to sign out?";
  if (window.confirm(prompt)) {
    logOut();
  }
}

function promptDeleteAccount() {
  const prompt =
    "Are you sure you want to delete you account?\nThis action cannot be undone.";
  if (window.confirm(prompt)) {
    deleteAccount();
  }
}

function logOut() {
  deleteCookie("user");
  console.log("log out");
  window.location.href = "/";
}

async function deleteAccount() {
  const response = await api.deleteAccount(filterCookieValue("id", "user"));
  
  if('statusCode' in response){
    alert(response.message)
  } else {
    logOut();
  }
}
