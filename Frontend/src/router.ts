/**
 * Router handles all url path and displays corresponding page
 * If cookie is set display home page for user, otherwise render landing page
 * Router resolves in main.ts file
 */

import Navigo from "navigo";
import displayCreatePostPage from "./modules/pages/displayCreatePostPage.js";
import { displayLandingPage } from "./modules/pages/displayLandingPage.js";
import displayHomePage from "./modules/pages/displayHomePage.js";
import { displayUsersPage } from "./modules/pages/displayUsersPage.js";
import { readCookie } from "./modules/api.js";
import { displayProfile } from "./modules/pages/displayProfilePage.js";
import { displayViewPostPage } from "./modules/pages/displayPostPage.js";

const router = new Navigo("/");

function setupRouter(): Promise<void> {
  return new Promise((resolve, reject) => {
    readCookie()
      .then((response) => {
        if (!response) {
          router.on("*", displayLandingPage);
        } else {
          router.on("/", ()=> displayHomePage() );
          router.on("/create-post", displayCreatePostPage);
          router.on("/users", displayUsersPage);
          router.on("/:category", ()=> displayHomePage() );
          router.on("/profile/:username", displayProfile);
          router.on("/posts/:postId", displayViewPostPage);
        }
        resolve();
      })
      .catch(reject);
  });
}

export { router, setupRouter };
