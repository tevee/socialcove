/*

DisplayLandingPage:

* The `displayLandingPage` function is responsible for rending  the landing page template.
* Users can create an account, log in, and select a profile image.
* Error handling is implemented for account creation, users get informed when they try to create a account that already exists. 
* If login and the account created is valid, user get redirected to homepage. 

*/

import {landingPageString} from "./components/templates/landing-page.js"
import { replace, stringToDOM } from "../utilities/templateUtils.js";
import * as api  from '../api.js';

const bananaUrlObj = new URL("../../img/userImgBanana.png", import.meta.url);
const pizzaUrlObj = new URL("../../img/userImgPizza.png", import.meta.url);
const donutUrlObj = new URL("../../img/userImgDonut.png", import.meta.url);

let createAccountForm: HTMLFormElement;
let logInForm: HTMLFormElement;
let selectElement: HTMLSelectElement;
let formContainer: HTMLElement;

function displayLandingPage(): void {
    let landingpageTemplate = landingPageString;
    landingpageTemplate = replace(landingpageTemplate, [
        {pattern: 'banana', replacement: bananaUrlObj.href},
        {pattern: 'donut', replacement: donutUrlObj.href},
        {pattern: 'pizza', replacement: pizzaUrlObj.href}
    ])
    
    const landingPage: HTMLElement = stringToDOM(landingpageTemplate);
    document.body.append(landingPage);
    
    const createAccountBtn = landingPage.querySelector('#createAccountBtn') as HTMLButtonElement;
    const signInBtn = landingPage.querySelector('#signInBtn') as HTMLButtonElement;
    createAccountForm = landingPage.querySelector('.create-account-form') as HTMLFormElement;
    logInForm = landingPage.querySelector('.log-in-form') as HTMLFormElement;
    selectElement = landingPage.querySelector('#userImage') as HTMLSelectElement;
    const closeFormBtns = landingPage.querySelectorAll('.xmark-close') as NodeListOf<HTMLElement>;
    const signUpLinks = landingPage.querySelectorAll('.link') as NodeListOf<HTMLAnchorElement>;
    formContainer = document.querySelector('.form-container') as HTMLDivElement;


    createAccountBtn.addEventListener('click', handleCreateAccountBtn);
    signInBtn.addEventListener('click', handleSignInBtn);
    document.addEventListener('click', handleFormClick);
    selectElement.addEventListener("change", handleSelectImgElement);
    closeFormBtns.forEach(closeFormBtn => {
        closeFormBtn.addEventListener('click', handleCloseFormBtn);
    });
    createAccountForm.addEventListener('submit', handleCreateAccount);
    logInForm.addEventListener('submit', handleLogInForm);
    signUpLinks.forEach(signUpLink => {
        signUpLink.addEventListener('click', handleSignUpLink);
    });
}

function handleCreateAccountBtn(e): void {
    e.stopPropagation();
    formContainer.classList.remove("hide");
    createAccountForm.classList.remove('hide');
    logInForm.classList.add('hide');

    // auto shows preselected profile image
    handleSelectImgElement();
}

function handleSignInBtn(e): void {
    e.stopPropagation();

    logInForm.classList.remove('hide');
    formContainer.classList.remove("hide");
    createAccountForm.classList.add('hide');
}

function handleFormClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;

    if(target.closest("form")) return;

    createAccountForm.classList.add('hide');
    logInForm.classList.add('hide');
    formContainer.classList.add("hide");
}

function handleSelectImgElement(): void {
    const imageContainer = document.querySelector('.img-container') as HTMLDivElement;
    let selectedValue = selectElement.value;
    
    displayUserImage(imageContainer, selectedValue)

}

function handleCloseFormBtn(event: MouseEvent): void {
    const formToHide = (event.currentTarget as HTMLElement).closest('form');
    if (formToHide) {
        formToHide.classList.add('hide');
        formContainer.classList.add('hide');
    }
}

async function handleCreateAccount(event: Event): Promise<void> {
    event.preventDefault();
    const userNameInput = document.querySelector('#userNameInput') as HTMLInputElement;
    const username = userNameInput.value;

    const passwordInput = document.querySelector('#passwordInput') as HTMLInputElement;
    const password = passwordInput.value;

    const selectedValue = selectElement.value;

    const newUser = {
        username: username,
        password: password,
        userImage: selectedValue
    };

    try {
        const response = await api.sendDataToServer(newUser, 'user')   

        if('statusCode' in response){
            throw new Error(response.message);

        } else if('id' in response){
            await api.sendLogInRequest(username, password);
            window.location.replace("/");

        } else {
            throw new Error("Unexpected Error. Try again later!")
        }
        
    } catch (error) {
        alert(error);
    }

    createAccountForm.reset();
}

async function handleLogInForm(event: Event): Promise<void> {
    event.preventDefault();
    const logInUsername = document.querySelector('#logInUsername') as HTMLInputElement;
    const username = logInUsername.value

    const logInPassword = document.querySelector('#logInPassword') as HTMLInputElement;
    const password = logInPassword.value;

    try {
        const response = await api.sendLogInRequest(username, password);

        if('statusCode' in response && response.statusCode === 401) throw new Error(response.message);
        
        window.location.replace("/");
    }
    catch(error) {
        alert(error)
    }

    logInForm.reset();
}

function handleSignUpLink(event: Event): void {
    event.preventDefault();
    if (createAccountForm && logInForm) {
        if ((event.currentTarget as HTMLAnchorElement).textContent === 'Sign up') {
            createAccountForm.classList.remove('hide');
            logInForm.classList.add('hide');
        } else if ((event.currentTarget as HTMLAnchorElement).textContent === 'Log in') {
            logInForm.classList.remove('hide');
            createAccountForm.classList.add('hide');
        }
    }
}

function displayUserImage(container: HTMLDivElement, imgPath:string): void {

    container.innerHTML = '';

    const imgEl = document.createElement('img');
    imgEl.src = imgPath; 

   container.appendChild(imgEl);
}

export {displayLandingPage, displayUserImage}
