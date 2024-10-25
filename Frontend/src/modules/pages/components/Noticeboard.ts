/**
 * Class Noticeboard create method returns DOM for Noticeboard component
*/

import * as template from "./templates/noticeboard.js";
import {
  replace,
  stringToDOM
} from "../../utilities/templateUtils.js";

export default class Noticeboard {
  static create(
    headerContent: string,
    itemsArray: string[] | HTMLElement[],
  ): HTMLDivElement {
    const headerTemp = replace(template.noticeboard, [
      { pattern: "header", replacement: headerContent },
    ]);
    const noticeboardEl = stringToDOM(headerTemp) as HTMLDivElement;
    const orderedListEl = noticeboardEl.querySelector("ol") as HTMLOListElement;

    for (const item of itemsArray) {
      orderedListEl.append(this.createItem(item));
    }
    return noticeboardEl;
  }

  private static createItem(item: string | HTMLElement):HTMLElement{
    let itemTemp = isHTMLElement(item)
      ? template.listItemFree
      : template.listItem;

    let listItemEl: HTMLElement;

    if (isHTMLElement(item)) {
      listItemEl = stringToDOM(itemTemp);
      listItemEl.append(item);
    } else {
      itemTemp = replace(itemTemp, [
        { pattern: "textContent", replacement: item },
      ]);
      listItemEl = stringToDOM(itemTemp);
    }

    return listItemEl
  }

}

function isHTMLElement(item: string | HTMLElement): item is HTMLElement {
  return typeof item !== "string";
}
