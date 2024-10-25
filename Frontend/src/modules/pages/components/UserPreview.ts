/**
 * Class UserPreview create method replaces placeholder strings in string templates with user information
 * returns the newly replaced string template parsed to HTML
 */

import * as template from "./templates/user-preview.js";
import {replace, stringToDOM} from "../../utilities/templateUtils.js";
import dayjs from "dayjs";
import { User } from "../../utilities/types.js";



export default class UserPreview {
    static create(user: User): HTMLLIElement {
        let userPreview = template.userPreview;
        
        userPreview = replace(userPreview, [
            {pattern: 'userimage', replacement: user.userImage},
            {pattern: 'userId', replacement: user.id},
            {pattern: 'username', replacement: user.username},
            {pattern: 'href-username', replacement: user.username},
            {pattern: 'userDateCreated', replacement: dayjs(user.created).format('DD MMMM YYYY')},
            {pattern: 'amountOfPosts', replacement: user.posts.length.toString()},
            {pattern: 'amountOfComments', replacement: user.comments.length.toString()}
        ])

        return stringToDOM(userPreview)
    }
}