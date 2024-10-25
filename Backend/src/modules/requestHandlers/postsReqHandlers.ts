// declares all request handlers mainly modifying posts.json
// next(CustomError) called in catch block to throw errors in afterware
// exports {getAllPosts, getOnePost, getAllPostsByUser, createPost, deletePost}

import CustomError from "../CustomError.js";
import { DB, User, Post, Comment } from "../../db/DBTypes.js";
import { read, write } from "../dataAccess.js";
import { Request, Response, NextFunction } from "express";
import {
  getItemById,
  removeItemFromArray,
  addItemToArray,
  getItemsById,
} from "../utils.js";

export async function getAllPosts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const posts: DB<Post> = await read.posts();

  res.json(posts);
}

export async function getPostById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await read.posts();

    // getItemById throws error if Id not found
    const post = getItemById(posts, req.params.postId);

    res.json(post);
  } catch (err) {
    next(err);
    return;
  }
}

export async function getAllPostsbyUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await read.posts();
    const users = await read.users();

    const user = getItemById(users, req.params.userId);

    if (!user) throw new CustomError(404, "User not found");

    const postsByUser = getItemsById(posts, user.posts);

    res.json(postsByUser);
  } catch (err) {
    next(err);
    return;
  }
}

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await read.posts();
    const users = await read.users();

    const user = getItemById(users, req.params.userId);

    // create new post
    const newPost: Post = {
        id: crypto.randomUUID(),
        created: req.body.timestamp,
        category: req.body.category,
        title: req.body.title,
        body: req.body.body,
        comments: [],
        user: req.body.user,
        rating: {
            upvotes: [],
            downvotes: []
        }
    };

    posts.push(newPost);
    await write.posts(posts);

    addItemToArray(user.posts, newPost.id);
    await write.users(users);

    res.json(newPost);
  } catch (err) {
    next(err);
    return;
  }
}

export async function deletePost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await read.posts();
    const users = await read.users();
    const comments = await read.comments();

    const post = getItemById(posts, req.params.postId);
    const user = getItemById(users, req.params.userId);

    if (!post) throw new CustomError(404, "Post not found");

    removeItemFromArray(posts, post);
    removeItemFromArray(user.posts, post.id);

    post.comments.forEach(id => {
      const comment = getItemById(comments, id)
      removeItemFromArray(comments, comment)
    })
    
    await write.posts(posts);
    await write.users(users);
    await write.comments(comments);
    
    res.json({ message: "Deleted post" });
  } catch (err) {
    next(err);
    return;
  }
}

export async function updateUpvotes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const posts = await read.posts();
        const post = getItemById(posts, req.params.postId);
        
        if(post) {
            post.rating.downvotes = post.rating.downvotes.filter(userId => userId !== req.params.userId);
            console.log('removed user from downvotes', post.rating.downvotes);

            if(post.rating.upvotes.includes(req.params.userId)) {
                post.rating.upvotes = post.rating.upvotes.filter(userId => userId !== req.params.userId);
                console.log('removed user from upvotes', post.rating.upvotes);
            }
            else {
                post.rating.upvotes.push(req.params.userId);
                console.log('added user in upvotes', post.rating.upvotes);
                
            }
        }

        await write.posts(posts);
        res.json(post.rating)
    }
    catch (err) {
        next(err)
        return;
    }
}

export async function updateDownvotes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const posts = await read.posts();
        const post = getItemById(posts, req.params.postId);
        
        if(post) {
            post.rating.upvotes = post.rating.upvotes.filter(userId => userId !== req.params.userId);

            if(post.rating.downvotes.includes(req.params.userId)) {
                post.rating.downvotes = post.rating.downvotes.filter(userId => userId !== req.params.userId);
            }
            else {
                post.rating.downvotes.push(req.params.userId);
            }
        }

        await write.posts(posts);
        res.json(post.rating)
    }
    catch (err) {
        next(err)
        return;
    }
}