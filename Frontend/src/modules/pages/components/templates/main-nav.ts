// Templates for MainNav
// This file contains templates for rendering the right-hand side navigation
// which contains links and dropdowns

// exports: 
// - nav (main wrapping element)
// - linkItem (used in the links section: Home, Profile etc )

// Patterns:
// __link__ (linkItem): Link href
// __icon__ (linkItem): Icon name from google Icons
// __name__ (linkItem): Link text

const nav = `
<aside class="main-nav">
    <header>
    <nav class="links">
        <ul></ul>
    </nav>
    </header>

    <div class="dropdowns" id="dropdowns"></div>

    <footer>
    <small>SocialCove Inc © 2024. All rights reserved.</small>
    </footer>
</aside>
`;

const linkItem = `
<li>
    <a class="unstyle" href="__link__">
        <span class="icon material-symbols-outlined">__icon__</span>
        __name__
    </a>
</li>
`;

export { nav, linkItem };
