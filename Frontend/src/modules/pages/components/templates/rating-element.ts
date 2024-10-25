// Templates for rating element
// This file contains the template for the upvote/downvote element.
// and variables for the upvote/downvote icons

// Update rating number by changing .rating-count text content

// exports: 
// - ratingElement

// Patterns:
// __rating__ : Rating count


const upvote = `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 13">
    <defs><style>.cls-1{stroke-width:0px;}.fill{opacity:0;}</style></defs>
    <g class="fill"><polygon class="cls-1" points="14 7 10 7 10 13 4 13 4 7 0 7 7 0 14 7"/></g>
    <path class="cls-1" d="m7,.71l5.79,5.79h-3.29v6h-5v-6H1.21L7,.71m0-.71L0,7h4v6h6v-6h4L7,0h0Z"/>
  </svg>
`;

const downvote = `
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 13">
  <defs><style>.cls-1{stroke-width:0px;}.fill{opacity:0;}</style></defs>
  <g class="fill"><polygon class="cls-1" points="0 6 4 6 4 0 10 0 10 6 14 6 7 13 0 6"/></g>
  <path class="cls-1" d="m9.5.5v6h3.29l-5.79,5.79L1.21,6.5h3.29V.5h5m.5-.5h-6v6H0l7,7,7-7h-4V0h0Z"/>
</svg>
`;

const ratingElement = `
  <button class="upvote"> 
    ${upvote}
  </button>
  <small>
    <span class="rating-count">__rating__</span>
  </small>
  <button class="downvote">
    ${downvote}
  </button>
`

export {ratingElement}