// The CategoryProfile class provides methods to create 
// category components with icon and name.
//
// create method: Returns DOM for a category component

import {getContrastColor} from "../../utilities/textColorUtils.js"
import { Category } from "../../utilities/types.js";
import {replace, stringToDOM} from "../../utilities/templateUtils.js";
import * as template from "./templates/category-profile.js";


export default class CategoryProfile{

  static create(category: Category, tagName: string):HTMLElement{
    const headerTemplate = this.createProfileTemplate(category, tagName);

    return stringToDOM(headerTemplate);
  }

  private static createProfileTemplate(category: Category, tagName: string){
    const headerTemplate = replace(template.profile, [
      {pattern: "tag-name", replacement: tagName},
      {pattern: "category-name", replacement: category.name},
      {pattern: "category-href", replacement: `/${category.name}`},
      {pattern: "category-bg-color", replacement: category.color},
      {pattern: "category-text-color", replacement: getContrastColor(category.color)},
      {pattern: "category-icon", replacement: category.icon}, 
    ]);

    return headerTemplate;
  }
}

