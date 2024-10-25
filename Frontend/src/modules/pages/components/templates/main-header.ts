// Templates for Header
// This file contains templates for the main page header

// exports: 
// - header (header elem with logo and navigation)
// - profileMenu (user dropdown displayed on profile icon click)
//      - userPreview should be prepended in container (by comment)

const header = `
<header class="main-header">
    <a class="logo" href="/">
        <span class="logo-text">SocialCove</span
    </a>
    <nav class="user-nav">
        <a class="unstyle pill hint--left hint--rounded" href="/create-post" aria-label="Create Post" aria-hidden="true">
            <span class="icon material-symbols-outlined">add</span>
            Create
        </a>
        
    </nav>
</header>
`;

const profileMenu = `
<div class="profile-menu">
    <!--user preview here -->
    <hr>
    <ul>
        <li><button id="log-out" class="unstyle">Log Out</button></li>
        <hr>
        <li><button id="delete-account" class="unstyle">Delete Account</button></li>
    </ul>
</div>
`;

export { header, profileMenu };
