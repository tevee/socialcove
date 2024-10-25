// handles all reading and writing to database
// exports {read, write} with methods: users, posts and comments

import fs from "fs/promises";
import { DB, DBPath, User, Post, Comment, Category } from "../db/DBTypes.js";

const getDBPath = (path: string) => `./src/db/${path}.json`;

const read = {
  users: async (): Promise<DB<User>> => await readFromDB("users"),
  posts: async (): Promise<DB<Post>> => await readFromDB("posts"),
  comments: async (): Promise<DB<Comment>> => await readFromDB("comments"),
  categories: async (): Promise<DB<Category>> => await readFromDB("categories"),
};

const write = {
  users: async (data: DB<User>): Promise<void> =>
    await writeToDB("users", data),
  posts: async (data: DB<Post>): Promise<void> =>
    await writeToDB("posts", data),
  comments: async (data: DB<Comment>): Promise<void> =>
    await writeToDB("comments", data),
  categories: async (data: DB<Category>): Promise<void> =>
    await writeToDB("categories", data),
};

async function readFromDB<T extends User | Post | Comment | Category>(
  path: DBPath
): Promise<DB<T>> {
  const db = await fs.readFile(getDBPath(path), "utf-8");

  const dbObj: DB<T> = db == "" ? [] : JSON.parse(db);

  return dbObj.sort((a, b) => {
    if (isCategory(a) || isCategory(b)) return 0;
    return new Date(b.created).getTime() - new Date(a.created).getTime(); 
  })
}

async function writeToDB(
  path: DBPath,
  data: DB<User | Post | Comment | Category>
): Promise<void> {
  fs.writeFile(getDBPath(path), JSON.stringify(data, null, 2));
}

function isCategory (value): value is Category {
  return typeof value === 'object' 
    && 'name' in value 
    && 'color' in value 
    && 'icon' in value 
    && 'category' in value
}

export { read, write };
