// Templates for CategoryProfile component
// This file contains templates for rendering category profiles

// Exports: 
// - icon (category icon)
// - name (category name)
// - profile (category name + icon in category wrapper)

// Patterns:
// __category-bg-color__ (icon, profile): Backgound color for category icon
// __category-text-color__ (icon profile): Text color for category icon
// __category-icon__ (icon, profile): Icon representing the category

// __tag-name__ (name, profile): HTML tag name for the category name
// __category-name__ (name, profile): Name of the category

const icon = `
<span class="img-icon" style="background-color:__category-bg-color__">
    <span class="icon material-symbols-outlined" style="color:__category-text-color__">__category-icon__</span>
</span>
`;

const name = `<__tag-name__ class="category-name"><a href="__category-href__" class="category-href">s/__category-name__</a></__tag-name__>`;

const profile = `
    <div class="category">
        ${icon}
        ${name}
    </div>
`;

export {icon, name, profile};