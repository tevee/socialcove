/**
 * footerContentUtils handles all events in the post footer such as up/downvote and copy link
 * footerContentUtils also updates the rating count and background color on up/downvote button
 *  */

import { Rating} from "./types.js";
import { filterCookieValue } from "./cookieUtils.js";
import * as api from "../api.js"

async function handleFooterContent(event: MouseEvent) {
  const {target} = event;

  if(!(target instanceof HTMLElement || target instanceof SVGElement)) return; // Narrow down the types on target so it won't complain

  if(target.id !== 'posts' && target.id !== 'comments') {
    let contentId:string;

    if(target.closest('.content-footer')) {
      const contentContainer = target.closest('.content-container') as HTMLDivElement;
      const loggedInUserId = filterCookieValue('id', 'user');
      contentId = contentContainer.id;
      let contentType: string;
      
      if(contentContainer.classList.contains('post-container')) contentType = 'post';
      else contentType = 'comment';
      
      if(target.closest('.rating')) {
        event.preventDefault();

        if(target.closest('.upvote')) {
          await api.updateUpvotes(contentType, contentId, loggedInUserId)
            .then(contentRating => {
              updateRating(contentRating, contentContainer);
              updateBGColor(target);
            });
        }
        else if(target.closest('.downvote')) {
          await api.updateDownvotes(contentType, contentId, loggedInUserId)
            .then(contentRating => {
              updateRating(contentRating, contentContainer);
              updateBGColor(target);
            });
        }
      }

      if(target.closest('.share-link-btn')) {
        event.preventDefault();
      }

      if(target.closest('.drop-down-share')) {
        event.preventDefault();

        if(contentType === 'post') {
          const postUrl = `${window.location.origin}/posts/${contentId}`;
          copyUrlToClipboard(postUrl);
        }
        else {
          const currentUrl = window.location.href;
          copyUrlToClipboard(currentUrl);
        }
      }
    }
    else return; 
  }
}

function updateRating(postRating: Rating, contentContainer: HTMLDivElement): void {
    const ratingEl = contentContainer.querySelector('.rating-count') as HTMLSpanElement;
    ratingEl.innerHTML = '';
    ratingEl.innerText = (postRating.upvotes.length - postRating.downvotes.length).toString();
}

function updateBGColor(target: HTMLElement | SVGElement): void {
  const ratingContainer = target.closest('.rating') as HTMLSpanElement;
  
  if(target.closest('.upvote')) {
    if(ratingContainer.classList.contains('downvote-active')) {
      ratingContainer.classList.remove('downvote-active');
    }
    ratingContainer.classList.toggle('upvote-active');
  }
  else if(target.closest('.downvote')) {
    if(ratingContainer.classList.contains('upvote-active')) {
      ratingContainer.classList.remove('upvote-active');
    }
    ratingContainer.classList.toggle('downvote-active');
  }
}

async function copyUrlToClipboard(text: string) {
  try {
      await navigator.clipboard.writeText(text);
      alert('Url copied!');
  } catch (err) {
      alert('Failed to copy url. Try again later!');
  }
}

export {handleFooterContent, updateRating, updateBGColor}