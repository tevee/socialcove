//Template for footer component used in both posts and comments.
// It renders HTML structure for rating element, sharing and copying links.

//Exports:
// -footer

import * as template from "./rating-element.ts";

const footer = 
`
<footer class="comment-footer content-footer">
            <span class="inherit-bg pill rating">
                ${template.ratingElement}
            </span>

            <div class="hover-container">
                <span class="share-link-btn inherit-bg pill long hover share">
                    <small>
                        <span class=" icon material-symbols-outlined">share</span>
                        Share
                    </small>
                </span>

                <div class="drop-down-share">
                    <div class="drop-down-content">
                        <span class="material-symbols-outlined">add_link</span>
                        Copy link
                    </div>
                </div>
            </div>
        </footer>
`;

export {footer}