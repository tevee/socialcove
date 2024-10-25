/**
 * Our own REST API
 * Following CRUD model
 * API handles all communication with database
 * API sends User, Post, Comment, Category, Cookie requests to our Backend
 */

import { CustomError, SuccessfulResponse, User, Post, Rating, Comment, Category } from "./utilities/types.js";

const baseUrl: string = 'http://localhost:3000/';
const header = {"Content-type": "application/json; charset=UTF-8"};

async function getAllCategories(): Promise<Category[]> {
    const url = `${baseUrl}categories`;

    const res = await fetch(url);
    const categories = await res.json();
    
    return categories;
}

async function getCategory(categoryName: string): Promise<Category> {
    const url = `${baseUrl}categories/${categoryName}`;

    const res = await fetch(url);
    const category = await res.json();
    
    return category;
}

async function getAllFilteredCategories(categoryName: string): Promise<Category[]> {
  const url = `${baseUrl}categories/category/${categoryName}`;

  const res = await fetch(url);
  const filteredCategories = await res.json();

  return filteredCategories;
}

async function getFavoriteCategories(userId: string): Promise<Category[]> {
  const url = `${baseUrl}categories/favorites/${userId}`;

  const res = await fetch(url);
  const categories = await res.json();

  return categories;
}

async function getAllUsers():Promise<User[]>{
    const url = baseUrl + 'users/';

    const res = await fetch(url);
    const users = await res.json();
    return users;
}

async function getUserByUsername(username: string): Promise<User | CustomError> {
    const url = `${baseUrl}users/username/${username}`;
    
    const res = await fetch(url);
    const user = await res.json();

    return user;
}

async function getAllPosts(): Promise<Post[]> {
  const url = `${baseUrl}posts`;
  
  const res = await fetch(url);
  const posts = await res.json();

  return posts;
}

async function getPost(id: string): Promise<Post|CustomError> {
  const url = baseUrl + `posts/${id}`;

  const res = await fetch(url);
  const post = await res.json();
  return post;
}

async function getAllPostsByUser(userId:string): Promise<Post[]>{
  const url = `${baseUrl}users/${userId}/posts`

  const res = await fetch(url);
  const post = await res.json();
  return post;
}

async function getAllComments(): Promise<Comment[]> {
  const url = baseUrl + "comments";
  const res = await fetch(url);
  const comments = await res.json();
  return comments;
}

async function getComment(commentId:string): Promise<Comment>{
  const url = `${baseUrl}comments/${commentId}`

  const res = await fetch(url);
  const comment = await res.json();
  return comment;
}

async function getAllCommentsByUser(userId:string): Promise<Comment[]>{
  const url = `${baseUrl}users/${userId}/comments`

  const res = await fetch(url);
  const comments = await res.json();

  return comments;
}

async function getAllCommentsInPost(postId: string): Promise<Comment[]> {
  const url = `${baseUrl}comments/post/${postId}`;
  
  const res = await fetch(url);
  const comments = await res.json();
  console.log(comments);

  return comments;
}

async function sendDataToServer<T extends User | Post | Comment | CustomError>(
  createdObject: Object,
  typeOfPost: string,
  userId?: string,
  postId?: string,
 
): Promise<any> {
  let url: string = baseUrl;
  if (typeOfPost === "user") url += `users`;
  else if (typeOfPost === "post") url += `users/${userId}/posts`;
  else if (typeOfPost === "comment")
    url += `posts/${postId}/users/${userId}/comments`;

  const options = {
    method: "POST",
    body: JSON.stringify(createdObject),
    headers: header,
  };

  const res = await fetch(url, options);
  const info = await res.json();
  return info;
}

async function sendLogInRequest(
  username: string,
  password: string
): Promise<User | CustomError> {
  const url = `${baseUrl}user/login`;

  const user = {
    username: username,
    password: password,
  };

  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify(user),
    headers: header,
    mode: "cors",
    credentials: "include",
  };

  const res = await fetch(url, options);
  const info = await res.json();

  return info;
}

async function readCookie(): Promise<boolean> {
  const req = new Request(`${baseUrl}read-cookie`, {
    mode: "cors",
    credentials: "include",
  });

  const res = await fetch(req);
  const cookieInfo = await res.json();
  return cookieInfo.ok;
}

async function deleteAccount(userId: string): Promise<SuccessfulResponse | CustomError> {
  const url = `${baseUrl}users/${userId}`;

  const options = {
    method: "DELETE",
    headers: header,
  };

  const res = await fetch(url, options);
  const info = await res.json();

  return info;
}

async function deletePost(userId: string, postId:string):Promise<Post|CustomError>{
  const url = `${baseUrl}users/${userId}/posts/${postId}`; 

  const options = {
    method: "DELETE",
    headers: header,
  };

  const res = await fetch(url, options);
  const info = await res.json();

  return info;

}

async function deleteComment(postId:string, userId:string, commentId:string):Promise<Comment|CustomError>{
  const url = `${baseUrl}posts/${postId}/users/${userId}/comments/${commentId}` 

  const options = {
    method: "DELETE",
    headers: header,
  };

  const res = await fetch(url, options);
  const info = await res.json();

  return info;
}

async function updateUpvotes(contentType: string, contentId: string, loggedInUserId: string): Promise<Rating> {
    let url: string;

    if(contentType === 'post') url = `${baseUrl}posts/${contentId}/update-upvotes/${loggedInUserId}`;
    else if(contentType === 'comment') url = `${baseUrl}comments/${contentId}/update-upvotes/${loggedInUserId}`;
    else throw new Error('Invalid content type');

    const options = {
        method: "PATCH",
        headers: header
    }

    const res = await fetch(url, options);
    const rating = await res.json();

    return rating;
}

async function updateDownvotes(contentType: string, contentId: string, loggedInUserId: string): Promise<Rating> {
  let url: string;

  if(contentType === 'post') url = `${baseUrl}posts/${contentId}/update-downvotes/${loggedInUserId}`;
  else if(contentType === 'comment') url = `${baseUrl}comments/${contentId}/update-downvotes/${loggedInUserId}`;
  else throw new Error('Invalid content type');

  const options = {
      method: "PATCH",
      headers: header
  }

  const res = await fetch(url, options);
  const rating = await res.json();
  
  return rating;
}

async function updateFavoriteCategory(categoryName: string, userId: string): Promise<User> {
  const url = `${baseUrl}categories/${categoryName}/${userId}`;

  const options = {
    method: "PATCH",
    headers: header
  }

  const res = await fetch(url, options);
  const favoriteCategories = await res.json();
  
  return favoriteCategories;
}

export {
  sendDataToServer,
  getAllUsers,
  readCookie,
  sendLogInRequest,
  getPost,
  getAllComments,
  getComment,
  deleteAccount,
  deletePost,
  deleteComment,
  getUserByUsername,
  getAllPostsByUser,
  getAllCommentsByUser,
  getAllCommentsInPost,
  getAllCategories,
  getCategory,
  getAllPosts,
  getAllFilteredCategories,
  updateUpvotes,
  updateDownvotes,
  updateFavoriteCategory,
  getFavoriteCategories
};
