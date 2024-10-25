/**
 * Adds class to elements the logged in user has upvoting or downvoted on page reload
 * Mostly for user experience to tell the user has upvoted or downvoted
 */

import { filterCookieValue } from "./cookieUtils.js";
import { Post, Comment } from "./types.js";

// Only takes one post as argument for reuseing the function
function applyUserFeedbackClassToContent(content: Post | Comment) {
    const loggedInUserId = filterCookieValue('id', 'user');

    const hasUserUpvoted = content.rating.upvotes.includes(loggedInUserId)
    const hasUserDownvoted = content.rating.downvotes.includes(loggedInUserId)

    if(hasUserUpvoted || hasUserDownvoted) {
        const container = document.body.querySelector(`[id="${content.id}"]`) as HTMLElement;
        const ratingContainer = container.querySelector('.rating') as HTMLSpanElement;
        
        if(hasUserUpvoted) {
            ratingContainer.classList.add('upvote-active');
        }
        else {
            ratingContainer.classList.add('downvote-active');
        }
    }
}

export {applyUserFeedbackClassToContent}