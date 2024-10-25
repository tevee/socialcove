// Templates for MainFeed
// This file contains templates for rendering posts feeds

// exports: 
// - feed (main wrapping element)
// - defaultTitle (default title displayed on homepage)
// - noPosts (default text when no posts found)

// Patterns:
// __containerType__ (feed): Unique id for the feed

const feed = `
  <main class="main-feed">
    <header class="page-title"></header>
    <hr />
    <div id="__containerType__"></div>
  </main>
`;

const defaultTitle= `
  <h2>All Posts</h2>
`;

const usersTitle = `
  <h2>All Users</h2>
`;

const noPosts = `
  <div>No posts yet...</div>
`;


export { feed, defaultTitle, usersTitle, noPosts };

