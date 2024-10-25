/**
 * Renders page layout from class PageLayout with PostForm HTML container as main content
 * Also renders a specific noticeboard for create post page
 * Create post page also checks forms validity
 * Post form is ready to be submitted only when all inputs contains text or content
 * Submitted form sends a post to database and redirects to post page
 * 
 * Sidenote:
 * Using Quill library changes textarea element to div which resulted in adding attribute contentEditable to make it act as a textarea
 * Using Quill library also creates <p> element as parent to the text string
 * In order to fix check form validity, an instance of MutationObserver is created in order to observe changes in the div
 * Creating a config {childList: true} for observer made it observe changes in child element inside the contentEditable div
 */

import * as api from "../api.js";
import { filterCookieValue } from "../utilities/cookieUtils.js";
import { Post } from "../utilities/types.js";
import PageLayout from "./components/PageLayout.js";
import Noticeboard from "./components/Noticeboard.js";
import PostForm, { addToolTipsToQuillButtons } from "./components/PostForm.js";

export default async function displayCreatePostPage(): Promise<void> {
    document.body.id = "createPostPage";
    document.body.classList.add("no-nav");

    const noticeBoardText: string[] = [
        "Remember the human behind the screen",
        "Behave like you would in real life",
        "Look for the original source of content",
        "Search for duplicates before posting",
        `Read the community's rules`,
    ];

    const pageLayout =  new PageLayout();
    await pageLayout.create(await PostForm.create());
  

    const noticeBoard = Noticeboard.create("Posting to SocialCove", noticeBoardText)

    pageLayout.repopulateSideBar([noticeBoard]);

    const mainContainerEl = document.querySelector("#mainContainer") as HTMLElement;
    addToolTipsToQuillButtons(mainContainerEl);

    const postForm = document.querySelector("#postForm") as HTMLFormElement;
    postForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        let postContent: string = (postForm.querySelector(".ql-editor") as HTMLDivElement).innerHTML;

        const formData: FormData = new FormData(postForm);
        formData.append("body", postContent);

        const newPost: Post = {} as Post;

        for (const [key, values] of formData) {
            newPost[key] = values;
        }

        if(checkFormValidity()) {
            try {
                const response = await api.sendDataToServer(newPost, "post", filterCookieValue("id", "user"))

                if('id' in response){
                    window.location.assign(`/posts/${response.id}`);
                }
                else if('statusCode' in response){
                    throw new Error(response.message);

                } else {
                    throw new Error("Unexpected Error. Try again later!")
                }

            } catch (error) {
                alert(error);
            }
        }
        else {
            alert('Failed form validity, please make sure to fill in all inputs before posting');
        }

        (postForm.querySelector(".ql-editor") as HTMLDivElement).innerHTML = "";
        postForm.reset();
    });

    // Can see it as a listener on DOM changes for div contentEditable
    const target = postForm.querySelector('.ql-editor') as HTMLDivElement;
    const observer = new MutationObserver(handleDivContentEditableChanges);
    const config = { childList: true, subtree: true }
    observer.observe(target, config)

    // Checking if checkFormValidity is true or false on all input change
    const formInputs = postForm.querySelectorAll('.check-form-validity');
    formInputs.forEach(element => {
        element.addEventListener('input', checkFormValidity)
    })

    function checkFormValidity(): boolean {
        const submitBtn = postForm.querySelector('.submit-btn') as HTMLButtonElement;

        // Checking values in input, select and div with contentEditable
        const allInputsHasValue = Array.from(formInputs).every(element => {
        if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
            return element.value.trim() !== "";
        }
        else if (element instanceof HTMLDivElement && element.contentEditable === "true") {
            return hasContent(element);
        }
        return false;
        });
        
        if (allInputsHasValue) submitBtn.classList.add('highlight-submit-btn');
        else submitBtn.classList.remove('highlight-submit-btn');

        return allInputsHasValue;
    }

    // Returns true if either image exists or text has content
    function hasContent(element: HTMLElement): boolean {
        const hasImages = !!element.querySelector('img'); // !! = convert truthy or false value to a boolean
        const hasIframes = !!element.querySelector('.ql-video');
        const hasTextContent = element.textContent?.trim() !== '';
        
        return hasTextContent || hasImages || hasIframes;

    }

    // Listens for DOM changes such as <img> or <iframe> and checks form validity
    function handleDivContentEditableChanges(records: MutationRecord[], observer: MutationObserver): void {
        for (const record of records) {

            for (const addedNode of record.addedNodes) {
                if(addedNode.textContent && addedNode.textContent.trim() === '') {
                    checkFormValidity();
                }
            }
            
            if(record.removedNodes.length > 0) checkFormValidity();
        }
    }


    

}

