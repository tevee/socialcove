// The DeleteContentBtn class provides a method to create functional 
// delete buttons for delete post/comment buttons with  
//
// create method: Returns DOM for a delete button

import { deleteContentBtn } from "./templates/delete-content-btn.js";
import { replace, stringToDOM } from "../../utilities/templateUtils.js";
import { filterCookieValue } from "../../utilities/cookieUtils.js";
import * as api from "../../api.js";

class DeleteContentBtn {
  static create(typeOfContent:string):HTMLButtonElement{
    let button = deleteContentBtn
    button = replace(button, [{pattern: 'typeOfContent', replacement: typeOfContent}] );
    
    const buttonEl = stringToDOM(button);

    buttonEl.addEventListener("click", (e:Event)=>{this.handleButtonClick(e, buttonEl)});

    return buttonEl;
  }

  private static async handleButtonClick(event:Event, button:HTMLButtonElement):Promise<void>{

    event.stopPropagation();
    const container = (event.target as HTMLElement).closest('.content-container') as HTMLElement;
    const containerId = container.id;
    const loggedInUserId = filterCookieValue('id', 'user');

    let confirmMessage = "Are you sure you want to delete this ";
    if (button.classList.contains('post')) {
      confirmMessage += "post?";
    } else {
      confirmMessage += "comment?";
    }

  const response = confirm(confirmMessage);

    if(response){
      try{
        if(button.classList.contains('post')){
          const response = await api.deletePost(loggedInUserId, containerId);
          if('statusCode' in response) throw new Error(response.message)

        } else{
          const commentObj = await api.getComment(containerId)
          const response = await api.deleteComment(commentObj.postId, loggedInUserId, commentObj.id)

          if('statusCode' in response) throw new Error(response.message)
        }

        container.remove();
      } catch(err){
          alert(err);
      }
    }    
     
  }


}

export{DeleteContentBtn}