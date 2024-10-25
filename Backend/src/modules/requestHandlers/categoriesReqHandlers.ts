// declares all request handlers to the /comments endpoint
// next(CustomError) called in catch block to throw errors in afterware
// exports {getAllComments, getOneComment, createPost, deletePost}

import CustomError from "../CustomError.js";
import { DB, Category, User } from "../../db/DBTypes.js";
import { read, write } from "../dataAccess.js";
import { Request, Response, NextFunction } from "express";
import { getItemById } from "../utils.js";

export async function getAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const categories: DB<Category> = await read.categories();

  res.json(categories);
}

export async function getOneCategory(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const categories: DB<Category> = await read.categories();
  
  const category = categories.find(c => c.name == req.params.categoryName)
  
  if(category) res.json(category);
  else throw new CustomError(404, 'Category not found')
}

export async function filterCategory(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const users: DB<User> = await read.users();
  const categories: DB<Category> = await read.categories();
  
  const filteredCategories = categories.filter(c => c.category == req.params.categoryName)
  
  if(filteredCategories) res.json(filteredCategories);
  else throw new CustomError(404, 'Category not found')
}

export async function getFavoriteCategories(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {userId} = req.params;
    if(!userId) throw new CustomError(400, 'Invalid request parameters: userId is required.');

    const users: DB<User> = await read.users();
    const categories: DB<Category> = await read.categories();

    const user = getItemById(users, userId)
    if(!user) throw new CustomError(404, 'User not found');
    
    const favoriteCategories = user.favoriteCategories.map(category => {
      return categories.find(c => c.name === category);
    })
    
    if(!favoriteCategories) throw new CustomError(404, 'Favorite Categories not found');
    else res.json(favoriteCategories);

  } catch (error) {
    next(error);
    return;
  }
}

export async function handleFavoriteCategory(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {userId, categoryName} = req.params;
    if(!userId || !categoryName) throw new CustomError(400, 'Invalid request parameters: userId and categoryName are required.')

    const users: DB<User> = await read.users();
    const categories: DB<Category> = await read.categories();
    let message: string;

    const user = getItemById(users, userId)
    if(!user) throw new CustomError(404, 'User not found');

    const category = categories.find(c => c.name === categoryName);
    if(!category) throw new CustomError(404, 'Category not found');
  
    if(!user.favoriteCategories.includes(category.name)) {
      user.favoriteCategories.push(category.name);
      message = 'Category added to favorites';
    }
    else {
      let index = user.favoriteCategories.indexOf(category.name);
      if(index >= 0 && index < user.favoriteCategories.length) {
        user.favoriteCategories.splice(index, 1);
        message = 'Category removed from favorites'
      }
    }
  
    await write.users(users);
    res.json({message})

  } catch (error) {
    next(error);
    return;
  }
}
