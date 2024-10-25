// The MainFeed class creates and returns a feed of posts
//
// using the posts passed as an argument.
// If a category name is passed as a second argument, 
// the method renders a category header
//
// - create method: Returns DOM for a post feed
//

import * as template from "./templates/main-feed.js";
import { sortDropdown } from "./templates/sort-dropdown.js";
import {replace, stringToDOM} from "../../utilities/templateUtils.js";
import PostPreview from "./PostPreview.js";
import { Category, Post} from "../../utilities/types.js";
import CategoryProfile from "./CategoryProfile.js";

export default class MainFeed {

  static create(posts: Post[], category?: Category|false) {

    const templateFeed = replace(template.feed, [{pattern: 'containerType', replacement: 'posts'}])
    const main = stringToDOM(templateFeed);
    const header = main.querySelector("header") as HTMLElement;

    const headerContent = category ? CategoryProfile.create(category, "h2") : stringToDOM(template.defaultTitle);

    header.append(headerContent, stringToDOM(sortDropdown));

    if(posts.length == 0){
      main.querySelector("#posts").append(stringToDOM(template.noPosts))
    } else {
      posts.forEach((post: Post) => {
      main
        .querySelector("#posts")
        .append(
          PostPreview.create(post), 
          document.createElement("hr")
        )
    });
    }

    return main;
  }
}