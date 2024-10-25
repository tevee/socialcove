/**
 * Class CommentFooter create method returns DOM for other components
*/
import * as template from "./templates/comment-footer.ts"
import { replace, stringToDOM } from "../../utilities/templateUtils.ts"
import { Rating } from "../../utilities/types.ts";

class CommentFooter {
    static create(rating: Rating): HTMLElement {
        let commentFooter = template.footer;
        commentFooter = replace(commentFooter, [
            {pattern: 'rating', replacement: (rating.upvotes.length - rating.downvotes.length).toString()}
        ]);

        return stringToDOM(commentFooter);
    }
}

export default CommentFooter;