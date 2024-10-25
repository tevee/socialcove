// Templates for create post page. 
// This file contains templates for rendering postForm 

const mainContainer: string = 
`
<main id="mainContainer">
    <div class="background-container">
        <div id="postContainer">
            <div class="post-heading">
                <h2>Create a post</h2>
            </div>
            <form id="postForm">
                <div class="category-container">
                    <select class="check-form-validity" name="category">
                        <option value="" disabled selected>Choose a community</option>
                    </select>
                </div>
                <div class="post-content-form">
                    <input type="text" id="" class="input check-form-validity" name="title" placeholder="Title" required>
                    <div class="post-content">
                        <div id="textEditor">
                        
                        </div>
                    </div>
                    <div class="post-content-form-footer">
                        <button class="submit-btn">Post</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</main>
`;

export {mainContainer}