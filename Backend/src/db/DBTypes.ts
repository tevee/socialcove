// exports all types associated with database

export type DBPath = "users" | "comments" | "posts" | "categories";

export type User = {
  id: string;
  created: number;
  username: string;
  password: string;
  userImage: string;
  posts: string[];
  comments: string[];
  favoriteCategories: string[];
};

export type UserShort = {
  id: string;
  username: string;
  userImage: string;
};

export type Post = {
  id: string;
  created: number;
  category: string;
  title: string;
  body: string;
  comments: string[];
  user: UserShort;
  rating: Rating;
};


export type Comment = {
  id: string;
  created: number;
  body: string;
  user: UserShort;
  postId: string;
  rating: Rating;
  
};

type Rating = {
  upvotes: string[];
  downvotes: string[];
}

export type Category = {
  name: string;
  color: string;
  icon: string;
  category: string;
}

export type DB<T extends User | Post | Comment | Category> = T[];
