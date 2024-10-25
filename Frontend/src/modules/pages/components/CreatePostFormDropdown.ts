/**
 * Class CreatePostFormDropdown create method returns DOM for PostForm component
 */

import * as template from "./templates/post-form-dropdown.js";
import { replace, stringToDOM } from "../../utilities/templateUtils.js";
import { Category } from "../../utilities/types.js";

class CreatePostFormDropdown {
    static create(category: Category): HTMLOptionElement {
        let categoryOption = template.categoryOption;
        
        categoryOption = replace(categoryOption, [
            {pattern: 'categoryValue', replacement: category.name},
            {pattern: 'categoryName', replacement: category.name}
        ])

        return stringToDOM(categoryOption);
    }
}

export default CreatePostFormDropdown