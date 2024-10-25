// Templates for ProfilePage component 
// This file contains the base HTML structure for redering user profile.  

// Exports:
// - main 
const main = `
<main class="main-feed">
    <div class="user-info"></div>    

    <div class="user-interactions-overview">
        <a class="post-link user-page-link" href="#">
            <span> Posts </span>
        </a>

        <a class="comments-link user-page-link" href="#">
            <span> Comments </span>
        </a>
    </div>

    <div id= "userHistory" class="comment-container"></div>

</main>


`

export {main}