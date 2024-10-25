// The MainNav class creates and returns the right-hand side navigation 
// with the page links and dropdown menus.
// 
// This class is accessed in the PageLayout module, and wherever the navigation should be 
// displayed beyond the general page layout.
//
// Which links and dropdowns should be displayed can be edited by modifying the 
// 'links' and 'categoryDropdowns' variables.
//
// -  create method (async): Returns the DOM for the page element.

import * as template from "./templates/main-nav.js";
import { replace, stringToDOM } from "../../utilities/templateUtils.js";
import Dropdown from "./DropdownElement.js";
import {filterCookieValue} from "../../utilities/cookieUtils.js";
import { LinkItem } from "../../utilities/types.js";
import * as api from "../../api.js"

const links = [
    {
      name: "Home",
      icon: "home",
      link: "/", 
    },
     {
      name: "Profile",
      icon: "person",
      get link (){return "/profile/" + filterCookieValue("username", "user")}, 
    },
  ];

const categoryDropdowns = ["Programming", "Frustration", "joyful"];

export default class MainNav {  

  static async create(): Promise<HTMLElement> {
    const navTemplate = template.nav;

    const nav = stringToDOM(navTemplate);

    const linkContainer = nav.querySelector(".links ul");
    const dropdownContainer = nav.querySelector("#dropdowns");

    links.forEach((link) =>
      linkContainer.append(this.createLinkLiItem(link))
    );

    const dropdownObjArr = await Dropdown.createCategoryObjectArray(categoryDropdowns);

    dropdownObjArr.forEach((dropdownObj) => {  
      dropdownContainer.append(
        document.createElement("hr"),
        Dropdown.create(dropdownObj.label, dropdownObj.id, dropdownObj.items)
      );
    });
    
    dropdownContainer.addEventListener('click', async (e: MouseEvent)=>{
      await this.handleFavoriteIconClick(e);
      // update fav highlight
      this.highlightFavoriteCategories(nav);
    });
    
    // pre highlight fav
    this.highlightFavoriteCategories(nav);
    return nav;
  }

  private static createLinkLiItem(item: LinkItem): HTMLElement {
    let linkItemTemplate = template.linkItem;

    linkItemTemplate = replace(linkItemTemplate, [
      { pattern: "link", replacement: item.link },
      { pattern: "icon", replacement: item.icon },
      { pattern: "name", replacement: item.name },
    ]);

    const linkItemEl = stringToDOM(linkItemTemplate);

    if(window.location.pathname == item.link){
      linkItemEl.querySelector("a").classList.add("current");
      linkItemEl.querySelector("span").classList = "material-symbols-sharp";
    }

    return linkItemEl
  }

  private static async handleFavoriteIconClick(event: MouseEvent): Promise<void> {
    event.stopPropagation();
    const {target} = event;

    if(!(target instanceof HTMLElement || target instanceof SVGElement)) return;
    
    if(target.closest('.icon-container')) {
      const categoryNameEl = target.closest('.sub-category')?.querySelector('.category-name') as HTMLSpanElement;
      const categoryName = categoryNameEl.innerText.split('/').pop();
      const loggedInUserId = filterCookieValue('id', 'user');

      if(categoryName) {
        await api.updateFavoriteCategory(categoryName, loggedInUserId);
        const favoriteCategories = await api.getFavoriteCategories(loggedInUserId);
        const updatedFavoriteDropdown = Dropdown.createCategoryObject('Favorites', favoriteCategories);
        
        const favoritesDropdown = target.closest('.dropdowns')?.querySelector('#dropdown-Favorites')?.closest('nav') as HTMLElement;
        favoritesDropdown.innerHTML = '';
        favoritesDropdown.append(Dropdown.create(updatedFavoriteDropdown.label, updatedFavoriteDropdown.id, updatedFavoriteDropdown.items));
      }

    }
  }

  private static async highlightFavoriteCategories(nav:HTMLElement):Promise<void>{
    const loggedInUserId = filterCookieValue('id', 'user');
    const favoriteCategories = await api.getFavoriteCategories(loggedInUserId);

    const favNames = favoriteCategories.map(c => c.name);

    const allDropdownSubCategories = nav.querySelectorAll(".sub-category");

    allDropdownSubCategories.forEach((subcat:Element) :void => {
      const catName = subcat.querySelector(".category-name")?.textContent?.split('/').pop() as string;

      if(favNames.includes(catName)){
        subcat.classList.add("favorite")
      } else {
        subcat.classList.remove("favorite")
      }
      
    });
  }

}

