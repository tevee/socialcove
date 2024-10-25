// The Dropdown class provides methods to create dropdown menus
// for displaying categories in the MainNav.
//
// - create method: Returns the DOM for a dropdown element
// - createCategoryObjectArray (async): Returns an array of objects which can 
//   be passed into the create method
// - createCategoryObject: Returns an object which can be passed into the create method

import * as template from "./templates/dropdown.js";
import {replace, stringToDOM} from "../../utilities/templateUtils.js";
import { Category, NavMainCategory, CategoryItem, DropdownDOM } from "../../utilities/types.js";
import * as api from "../../api.js"
import CategoryProfile from "./CategoryProfile.js";
import { filterCookieValue } from "../../utilities/cookieUtils.js";

export default class Dropdown {
  static create(label: string, id: string, items: CategoryItem[]): HTMLElement {
    let dropdownTemplate = template.dropdown;

    dropdownTemplate = replace(dropdownTemplate, [
      { pattern: "heading", replacement: label },
      { pattern: "id", replacement: id },
    ]);

    const dropdown: HTMLElement = stringToDOM(dropdownTemplate);

    const DOM = {
      dropdown,
      label: dropdown.querySelector("label") as HTMLElement,
      ul: dropdown.querySelector("ul") as HTMLElement,
      ulWrapper: dropdown.querySelector(".list-wrapper") as HTMLElement,
    };
    
    items.forEach((item) => DOM.ul.append(this.createLiEl(item)));

    DOM.label.addEventListener("click", () => this.handleLabelClick(DOM));

    return dropdown;
  }

  private static createLiEl(item: CategoryItem) {
    const liTemplate = replace(template.item, [
      {pattern: "url", replacement: item.url},
      {pattern: "class-name", replacement:item.class}
    ]);

    const liEl = stringToDOM(liTemplate)

    liEl.firstElementChild.append(item.content);

    return liEl;
  }

  private static handleLabelClick(DOM: DropdownDOM): void {
    DOM.label.classList.toggle("open");

    if (DOM.label.classList.contains("open")) {
      DOM.ulWrapper.style.height = this.getUlHeight(DOM.ul);
    } else {
      DOM.ulWrapper.style.height = "0";
    }
  }

  private static getUlHeight = (ul: HTMLElement): string => getComputedStyle(ul).height;
    

  static async createCategoryObjectArray(categoryArray: string[]):Promise<NavMainCategory[]>{
    const dropdownArray: NavMainCategory[] = [];
    const loggedInUserId = filterCookieValue('id', 'user');

    const categories = await api.getAllCategories();
    const favoriteCategories = await api.getFavoriteCategories(loggedInUserId);

    dropdownArray.push(this.createCategoryObject('Favorites', favoriteCategories))

    categoryArray.forEach(categoryName => {
      const categoryItems = categories.filter(c => c.category == categoryName);
      dropdownArray.push(this.createCategoryObject(categoryName, categoryItems));
    });

    dropdownArray.push(this.createCategoryObject("All", categories))

    return dropdownArray;
  }

 static createCategoryObject(categoryName: string, categoryItems: Category[]): NavMainCategory {
    return {
      label: categoryName,
      id: "dropdown-" + categoryName,
      items: categoryItems.map(c=> {
        return {
          url: "/" + c.name,
          class: "sub-category",
          content: CategoryProfile.create(c, "small")
        }
      })
    }    
  }

}

