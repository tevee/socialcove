// The UserProfile class provides methods for creating user profile components
//
// -  create method: Returns user profile component with name and icon
// -  createPreview method: Returns user profile component with link to page
// -  createProfileImage method: Returns user profile component with only icon
// -  createCommentProfile method: Returns user profile component followed by timestamp

import * as template from "./templates/user-profile.js";
import { replace, stringToDOM } from "../../utilities/templateUtils.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default class UserProfile {
  static create(
    username: string,
    img: string,
    size: "large" | "small" = "small"
  ): HTMLElement {
    const profileTemplate = replace(template.userProfile, [
      {
        pattern: "username",
        replacement: username,
      },
      {
        pattern: "img",
        replacement: img,
      },
      {
        pattern: "size",
        replacement: size,
      },
    ]);

    const profile = stringToDOM(profileTemplate);

    return profile;
  }

  static createPreview(username: string, img: string): HTMLElement {
    const profileTemplate = replace(template.userProfilePreview, [
      {
        pattern: "username",
        replacement: username,
      },
      {
        pattern: "img",
        replacement: img,
      },
      {
        pattern: "link",
        replacement: "/profile/" + username,
      },
    ]);

    const profile = stringToDOM(profileTemplate);

    return profile;
  }

  static createProfileImg(img: string): HTMLElement {
    const imgTemplate = replace(template.userImgProfile, [
      { pattern: "img", replacement: img },
    ]);
    return stringToDOM(imgTemplate);
  }

  static createCommentProfile(
    username: string,
    img: string,
    created: string
  ): HTMLElement {
    const profile = this.create(username, img);

    const timestampTemplate = replace(template.timestamp, [
      {
        pattern: "timestamp",
        replacement: dayjs(created).fromNow(),
      },
    ]);

    profile.append(stringToDOM(timestampTemplate));

    return profile;
  }
}
