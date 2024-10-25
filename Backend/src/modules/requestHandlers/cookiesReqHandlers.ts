import { Request, Response, NextFunction } from "express";
import { CookieOptions } from "express";
import { DB, User, Post, Comment } from "../../db/DBTypes.js";
import { read } from "../dataAccess.js";
import CustomError from "../CustomError.js";

async function readCookie(req: Request, res: Response, next:NextFunction): Promise<void> {
    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Credentials', 'true');

    if (req.cookies.user) res.json({ok: true, status: 200});
    else res.json({ok: false, status: 401});
}

async function setCookie(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const users: DB<User> = await read.users();
        const {username, password} = req.body;
        const foundUser = users.find(u => u.username === username.trim() && u.password === password.trim())
        
        if(!foundUser) throw new CustomError(401, 'Incorrect credentials. Verify username and password.')
        
        res.set('Access-Control-Allow-Origin', req.headers.origin);
        res.set('Access-Control-Allow-Credentials', 'true');
        const settings: CookieOptions = {
            path: '/',
            httpOnly: false,
            maxAge: 1000*60*60*24*7,
            sameSite: 'none',
            secure: true
        };

        res.cookie('user', `id:${foundUser.id}--username:${foundUser.username}--userimage:${foundUser.userImage}`, settings)
        res.json({message: `User credentials matched, ${username} logged in`, cookieMessage: 'cookies set'});
    }
    catch(error) {
        next(error)
    }
}

export {readCookie, setCookie}