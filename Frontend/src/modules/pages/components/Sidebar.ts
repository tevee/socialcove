// The Sidebar class creates and returns the left-hand side sidebar
//
// if DOM content is passed as an arugment, it is appended into the sidebar
// The class is primarily used by the PageLayout class
//
// -  create method: Returns the DOM for the sidebar

import * as template from "./templates/main-aside";
import { stringToDOM } from "../../utilities/templateUtils";

export default class Sidebar{
    static create(content: HTMLElement[]): HTMLElement{
        const aside = stringToDOM(template.aside);

        const sidebar = aside.querySelector(".sidebar") as HTMLElement;

        content.forEach(el => sidebar.append(el))

        return aside;
    }
}