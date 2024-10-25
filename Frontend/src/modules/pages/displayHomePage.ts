/**
 * Renders layout from class PageLayout component
 * Home page reads the url and displays posts corresponding to the endpoint:
 * - Category name endpoints displays all posts for the corresponding category
 * - No endpoint displays all existing posts
 * Home page sorts posts in descending order by default
 * User can choose to sort by rating, newest, and oldest
*/

import MainFeed from "./components/MainFeed.js";
import * as api from "../api.js";
import { Category, Post } from "../utilities/types.js";
import { applyUserFeedbackClassToContent } from "../utilities/loggedInUserUtils.js";
import * as rating from "../utilities/footerContentUtils.js";
import PageLayout from "./components/PageLayout.js";
import PostPreview from "./components/PostPreview.js";

export default async function displayHomePage() {
    let posts = await api.getAllPosts();
    
    const category : false | Category = await getPageCategory();

    if(category){
        posts = posts.filter(p=>p.category == category.name);
    }

    const pageLayout = new PageLayout();
    await pageLayout.create(MainFeed.create(posts, category))

    posts.forEach(applyUserFeedbackClassToContent)
    
    const postsContainer = document.querySelector('#posts') as HTMLDivElement;
    const sortDropdown = document.querySelector('.sort') as HTMLSelectElement;

    postsContainer.addEventListener('click', rating.handleFooterContent)
    sortDropdown.addEventListener('change', handleSortDropdown)
}

async function getPageCategory():Promise<Category|false>{
    const categoryName = getPageURLParam();

    if(!categoryName) return false;

    return await api.getCategory(categoryName)
}

function getPageURLParam() :string{
    const urlParts: string[] = window.location.pathname.split("/");
    const urlPathEndpoint: string = urlParts[urlParts.length - 1];
    return urlPathEndpoint;
}

async function handleSortDropdown(event: Event): Promise<void> {
    const {target} = event;
    if(!(target instanceof HTMLSelectElement)) return;

    let updatedPosts = await api.getAllPosts();
    const category : false | Category = await getPageCategory();
    if(category){
        updatedPosts = updatedPosts.filter(p=>p.category == category.name);
    }
    
    const sortedPosts = sortPosts(target.value, updatedPosts);
    
    const postsContainer = target.closest('.main-feed')?.querySelector('#posts') as HTMLDivElement;
    postsContainer.innerHTML = '';

    sortedPosts.forEach(post => {
        postsContainer.append(PostPreview.create(post))
        applyUserFeedbackClassToContent(post);
    })
} 

function sortPosts(type: string, posts: Post[]): Post[] {
    if(type === 'rating') {
        return posts.sort((a, b) => {
            return (b.rating.upvotes.length - b.rating.downvotes.length) - (a.rating.upvotes.length - a.rating.downvotes.length);
        });
    }
    else if(type === 'newest') {
        return posts.sort((a, b) => {
            return new Date(b.created).getTime() - new Date(a.created).getTime();
        });
    }
    else if(type === 'oldest') {
        return posts.sort((a, b) => {
            return new Date(a.created).getTime() - new Date(b.created).getTime();
        });
    }
    else return posts;
}