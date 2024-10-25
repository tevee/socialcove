/**
 * Renders display all users page using class Pagelayout
 * Fetches all users from database and displays a list of all users using UserPreview component
 */

import * as template from "./components/templates/main-feed.js";
import { userListContainer } from "./components/templates/user-preview.js";
import {replace, stringToDOM} from "../../modules/utilities/templateUtils.js";
import UserPreview from "./components/UserPreview.js";
import * as api from "../api.js"
import PageLayout from "./components/PageLayout.js";

async function displayUsersPage(): Promise<void> {
    const templateFeed = replace(template.feed, [
        {pattern: 'containerType', replacement: 'users'}
    ])
    
    const main = stringToDOM(templateFeed);
    const ul = stringToDOM(userListContainer);

    const header = main.querySelector('.page-title') as HTMLHeadElement;
    header.append(stringToDOM(template.usersTitle));

    const users = await api.getAllUsers()
    users.forEach(user => {
        ul.append(UserPreview.create(user), document.createElement("hr"))
    })
    
    main.querySelector('#users').append(ul)

    const pageLayout = new PageLayout();
    await pageLayout.create(main)

}

export {displayUsersPage}