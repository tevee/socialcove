// Templates for all posts on homepage(postPreview). 

import * as template from "./rating-element.js";

const postPreview = `
<article id="__postId__" class="post preview boxed post-container content-container">
    <a class="unstyle" href="__link__">
        <header>
            <div class="category-wrapper"></div>
            <small class="timestamp">__age__</small>
        </header>
        <section>
            <h2 class="title">__title__</h2>
            <div class="body">
            __body__
            </div>
        </section>
        <footer class="content-footer">
            <span class="pill rating">
                ${template.ratingElement}
            </span>
            <span class="pill long hover unstyle">
                <small>
                    <span class="icon material-symbols-outlined">chat</span>
                    __comments__
                </small>
            </span>

            <div class="hover-container">
                <span class="share-link-btn pill  long hover share">
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
    </a>
</article>
`;

export { postPreview };
