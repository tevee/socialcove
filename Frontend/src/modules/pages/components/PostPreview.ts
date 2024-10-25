// The PostPreview class creates and returns post previews
//
// If it is a post of the logged in user, it adds a delete button 
//
// -  create method: Returns the DOM for the post preview.

import * as template from "./templates/post-preview.js";
import { replace, stringToDOM } from "../../utilities/templateUtils.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Post } from "../../utilities/types.js";
import { parseDBString } from "../../utilities/stringUtils.js";
import * as api from "../../api.js";
import CategoryProfile from "./CategoryProfile.js";
import {DeleteContentBtn} from"./DeleteContentBtn.js";
import { filterCookieValue } from "../../utilities/cookieUtils.js";

dayjs.extend(relativeTime);

export default class PostPreview {
  static create(post: Post,): HTMLElement {
    let previewTemplate = template.postPreview;

    previewTemplate = replace(previewTemplate, [
      { pattern: "postId", replacement: post.id as string},
      { pattern: "link", replacement: `/posts/${post.id}` },
      { pattern: "age", replacement: dayjs(post.created).fromNow() },
      { pattern: "title", replacement: post.title },
      { pattern: "body", replacement: parseDBString(post.body) },
      { pattern: "rating", replacement: (post.rating.upvotes.length - post.rating.downvotes.length).toString() },
      { pattern: "comments", replacement: post.comments.length.toString() },
    ]);

    const postPreview = stringToDOM(previewTemplate);

    // change category icon
    api.getCategory(post.category).then(category =>{
      const categoryWrapper = postPreview.querySelector(".category-wrapper") as HTMLElement;

      categoryWrapper.append(CategoryProfile.create(category, "span"))
    })

    
    // add delete button to own posts
    const ownPost = filterCookieValue('id', 'user') == post.user.id;
    if (ownPost) {
      postPreview.classList.add("profile-item");
      const deleteBtn = DeleteContentBtn.create("post");
      postPreview.append(deleteBtn);
    } 

    return postPreview;
  }
}
