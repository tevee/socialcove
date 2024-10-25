/**
 * cookieUtils reads user cookie - primarily using filterCookieValue
 * 
 * Cookie example:
 *  - user = id%3Ae536b913-b7d5-4f0a-a269-24792597d638--username%3AClara--userimage%3Ahttp%3A%2F%2Flocalhost%3A1234%2FuserImgDonut.d6d53db1.png%3F1712304142892
 * 
 * filterCookieKey returns the desired name of the key in the cookie
 *  - e.g filterCookieKey('user') returns 'user: id%3Ae536b913-b7d5-4f0a-a269-24792597d638...'
 * 
 * filterCookieValue returns a specific part of the value in the key
 *  - e.g filterCookeiValue('username', 'user') returns 'Clara'
 * 
 * deleteCookie function deletes the cookie
 */


function filterCookieKey(cookieKey: string): string {
  const cookie: string = decodeURIComponent(document.cookie);
  const cookieValue: string = cookie.split(`${cookieKey}=`)[1];
  const matchedKey: string = cookieValue.split(";")[0];

  return matchedKey;
}

function filterCookieValue(key: string, cookieKey: string): string {
  const cookieValue = filterCookieKey(cookieKey);
  const parts: string[] = cookieValue.split(`--`);

  const filteredKeyValue: string[] = parts.filter((element) => {
    const keyValue: string[] = element.split(":");
    return keyValue.length >= 2 && keyValue[0].trim() === key;
  });

  let matchedValue: string = "";
  if (filteredKeyValue.length > 0) {
    const indexOfSeparator = filteredKeyValue[0].indexOf(":");
    matchedValue = filteredKeyValue[0].slice(indexOfSeparator + 1);
  }

  return matchedValue;
}

function deleteCookie(cookieKey: string): void {
  document.cookie = `${cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export { filterCookieKey, filterCookieValue, deleteCookie };
