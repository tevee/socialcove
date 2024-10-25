// Templates for post page.
// This file contains templates for rendering postpage and comments in post. 

import * as template from "./rating-element";

const postPage = `
<main class="main-feed">
    <article id="__postId__" class="post post-container content-container">
        <div class="user-info-container">
            <div class="user-img-container"></div>
            <div class="user-info-item"></div> 
        </div>
        
        <div class="content-div"></div>

        <footer class="interaction-container content-footer">
            <span class="pill rating">
                ${template.ratingElement}
            </span>

            <span class="pill long hover">
                <a href="#comments" class="unstyle">
                    <small>
                        <span class="icon material-symbols-outlined">chat</span>
                        <span class="amount-of-comments"></span>
                    </small>
                </a>
            </span> 
        </footer>
    </article>

    <div class="comment-btn">
        <button class="add-comment-btn"><i class="fi fi-rr-plus"></i> Add a Comment</button>
    </div>

    <form class="comment-form">
        <div class="textarea-container hide">
            <textarea name="body" class="comment-input" cols="50" rows="4" required></textarea>
            <div class="button-wrapper">
                <button class="cancel-button">Cancel</button>
                <button id="addCommentBtn" class="submit-button">Comment</button>
            </div>
        </div>
    </form>
   
    <div id= "comments" class="comment-container">

        <div class="comment-info"></div>
        

    </div>

</main>


`

export {postPage}