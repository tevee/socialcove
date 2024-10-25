// declares all request handlers to the /comments endpoint
// next(CustomError) called in catch block to throw errors in afterware
// exports {getAllComments, getCommentById, createPost, deletePost}

import CustomError from "../CustomError.js";
import { DB, User, Post, Comment } from "../../db/DBTypes.js";
import { read, write } from "../dataAccess.js";
import { Request, Response, NextFunction } from "express";
import {
  getItemById,
  getItemsById,
  removeItemFromArray,
  addItemToArray,
} from "../utils.js";

export async function getAllComments(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const comments: DB<Comment> = await read.comments();

  res.json(comments);
}

export async function getCommentById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const comments: DB<Comment> = await read.comments();

    // getItemById throws error if Id not found
    const comment = getItemById(comments, req.params.commentId);

    res.json(comment);
  } catch (err) {
    next(err);
    return;
  }
}

export async function getAllCommentsByUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const users = await read.users();
    const comments = await read.comments();

    const user = getItemById(users, req.params.userId);

    const commentsByUser = getItemsById(comments, user.comments);

    res.json(commentsByUser);
  } catch (err) {
    next(err);
    return;
  }
}

export async function getAllCommentsInPost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await read.posts();
    const comments = await read.comments();

    const post = getItemById(posts, req.params.postId);
    const commentsInPost = getItemsById(comments, post.comments);
    
    if(commentsInPost) res.json(commentsInPost);
    else throw new CustomError(404, 'Comments in post not found');
    
  } catch (err) {
    next(err);
    return;
  }
}

export async function addComment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await read.posts();
    const users = await read.users();
    const comments = await read.comments();

    const user = getItemById(users, req.params.userId);
    const post = getItemById(posts, req.params.postId);

    const newComment: Comment = {
      id: crypto.randomUUID(),
      body: req.body.body,
      created: req.body.timestamp,
      user: req.body.user,
      postId: req.params.postId,
      rating: {
        upvotes: [],
        downvotes: []
      }
    };

    console.log(req.params.postId)

    comments.push(newComment);

    await write.comments(comments);

    addItemToArray(post.comments, newComment.id);
    addItemToArray(user.comments, newComment.id);
    await write.users(users);
    await write.posts(posts);

    res.json(newComment);
  } catch (err) {
    next(err);
    return;
  }
}

export async function deleteComment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await read.posts();
    const users = await read.users();
    const comments = await read.comments();

    // throws error if not found
    const post = getItemById(posts, req.params.postId);
    const user = getItemById(users, req.params.userId);
    const comment = getItemById(comments, req.params.commentId);

    removeItemFromArray(comments, comment);
    removeItemFromArray(post.comments, comment.id);
    removeItemFromArray(user.comments, comment.id);

    await write.comments(comments);
    await write.posts(posts);
    await write.users(users);

    res.json({ message: "Deleted comment" });
  } catch (err) {
    next(err);
    return;
  }
}

export async function updateUpvotes(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
      const comments = await read.comments();
      const comment = getItemById(comments, req.params.commentId);

      if(comment) {
        comment.rating.downvotes = comment.rating.downvotes.filter(userId => userId !== req.params.userId);

          if(comment.rating.upvotes.includes(req.params.userId)) {
              comment.rating.upvotes = comment.rating.upvotes.filter(userId => userId !== req.params.userId);
          }
          else {
              comment.rating.upvotes.push(req.params.userId);
          }
      }

      await write.comments(comments);
      res.json(comment.rating)
  }
  catch (err) {
      next(err)
      return;
  }
}

export async function updateDownvotes(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
      const comments = await read.comments();
      const comment = getItemById(comments, req.params.commentId);
      
      if(comment) {
        comment.rating.upvotes = comment.rating.upvotes.filter(userId => userId !== req.params.userId);

          if(comment.rating.downvotes.includes(req.params.userId)) {
            comment.rating.downvotes = comment.rating.downvotes.filter(userId => userId !== req.params.userId);
          }
          else {
            comment.rating.downvotes.push(req.params.userId);
          }
      }

      await write.comments(comments);
      res.json(comment.rating)
  }
  catch (err) {
      next(err)
      return;
  }
}