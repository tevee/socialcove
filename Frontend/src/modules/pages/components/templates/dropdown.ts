// Templates for DropdownElement component
// This file contains templates for rendering dropdown elements

// exports: 
// - dropdown (dropdown element)
// - item (dropdown sub-category item with favorite button)

// Patterns:
// __id__ (dropdown): Unique id for the dropdown
// __heading__ (dropdown): Dropdown label text

// __url__ (item): Item link
// __class-name__ (item): Item class name

const dropdown = `
<nav class="dropdown">
    <label class="label open" for="__id__">
        <h3 class="list-heading">
            __heading__
        </h3>
        <span class="icon material-symbols-outlined">expand_more</span>
    </label>
    <div class="list-wrapper">
        <ul id="__id__" class="dropdown">
        
        </ul>
    </div>
</nav>
`;

const item = `
    <li class="__class-name__">
        <a href="__url__"></a>
        <div class="icon-container">
            <svg viewBox="0 0 24 24" class="favorite-icon" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z" stroke="#222222" class="favorite-icon-outline"></path> </g></svg>
        </div>
    </li>
`;

export { dropdown, item };
