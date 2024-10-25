/**
 * types.ts contains all project types
 */

type CustomError = {
  statusCode: number;
  message: string;
}

type SuccessfulResponse = {
  message: string;
}

type User = {
  id: string;
  username: string;
  password: string;
  userImage: string;
  posts: string[];
  comments: string[];
  created: number;
  favoriteCategories: string[];
};

type Post = {
  id: string;
  category: string;
  title: string;
  body: string;
  created: string;
  comments: string[];
  user: {
    id: string;
    username: string;
    userImage: string;
  };
  rating: Rating;
};

type Comment = {
  id: string;
  body: string;
  created: string;
  postId:string;
  user: {
    id: string;
    created?: string;
    username: string;
    userImage: string;
  };
  rating: Rating;
};

type Rating = {
  upvotes: string[];
  downvotes: string[];
}

type Category = {
  name: string;
  color: string;
  icon: string;
  category: string;
};

// Main Nav type
type LinkItem = {
  link: string;
  icon: string;
  name: string;
};

// For dropdown
type DropdownDOM = {
  dropdown: HTMLElement;
  label: HTMLElement;
  ul: HTMLElement;
  ulWrapper: HTMLElement;
};

type NavMainCategory = {
  label: string;
  id: string;
  items: CategoryItem[];
};

type CategoryItem = {
  url: string;
  class: string;
  content: HTMLElement;
};
// For dropdown end

type ReplacePair = {
  pattern: string;
  replacement: string;
};

export {CustomError, SuccessfulResponse, User, Post, Rating, Comment, Category, LinkItem, DropdownDOM, NavMainCategory, CategoryItem, ReplacePair };
