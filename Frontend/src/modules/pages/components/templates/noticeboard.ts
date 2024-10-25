// Templates for Noticeboard
// This file contains templates for rendering noticeboard components

// exports: 
// - noticeboard (main wrapping element)
// - listItem (numbered list item with text)
// - listItemFree (unnumbered list item, any content)
//      - Append element in container

// Patterns:
// __header__ (noticeboard): Noticeboard title

// textContent (listItem): Text content of list item


const noticeboard = `
<div class="noticeboard">
    <h2 class="bottom-border">__header__</h2>
        <ol>

        </ol>
</div>
`;

const listItem = `<li class="bottom-border">__textContent__</li>`;

const listItemFree = `<li class="unstyled"></li>`;

export { noticeboard, listItem, listItemFree };
