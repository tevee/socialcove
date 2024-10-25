// Templates for user profile.
// This file contains the template for user profile element.

// Exports: 
// - userImgProfile (userImg + tool tip)
// - userImg (userImg)
// - userProfile (userImg + userName)
// - username 
// - timestamp 
// - userProfilePreview (username, userImg, preview)

const userImgProfile = ` <span class="hint--left hint--rounded user-img-wrapper" aria-label="View profile" > <img class="user-img"  src="__img__"> </span>`;
const userImg = `  <img class="user-img"  src="__img__">`;

const username = `<small class="username">u/__username__</small>`;

const timestamp = `
<small class="timestamp">__timestamp__</small>
`;

const preview = `
    <span class="to-profile"><small>View Profile</small></span>
`;

const userProfile = `
<div class="user __size__">
    ${userImgProfile}
    ${username}
</div>
`;

const userProfilePreview = `
<div class="user preview">
    <a href="__link__" class="unstyle">
        ${userImg}
        ${preview}
        ${username}
    </a>
</div>
`;

export { userImg, userImgProfile, userProfile, username, timestamp, userProfilePreview };
