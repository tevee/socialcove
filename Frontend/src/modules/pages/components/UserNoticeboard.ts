// The UserNoticeboard class fetches all users, and creates and returns
// DOM for a noticeboard with a few users and "see all" link
//
// Amount of users displayed can be set using visibleUsersN variable
//
// -  create method: Returns the DOM for the user noticeboard

import Noticeboard from "./Noticeboard";
import * as api from "../../api.js";
import UserProfile from "./UserProfile";
import {User} from "../../utilities/types.js"

export default class UserNoticeboard{
    private static visibleUsersN = 5;

    static async create(): Promise<HTMLElement>{
        const users = await api.getAllUsers();
        const header = "Users";
        const itemsArray=  this.createItemsArray(users);

        return Noticeboard.create(header, itemsArray);
    }

    private static createItemsArray(users: User[]):any[]{
        if(users.length == 0 ) return ["No users..."];

        const firstNUsers = users.slice(0, this.visibleUsersN);

        const userArray = firstNUsers.map((u: User) =>
            UserProfile.createPreview(u.username, u.userImage)
        );

        const seeMore = document.createElement("a");
        seeMore.textContent = "See All Users";
        seeMore.href = "/users";

        userArray.push(seeMore);

        return userArray;
    }
}