// Utility for getting the contrast white or black of a hex code color
//

function getContrastColor(hexColor: string): 'black' | 'white' {
  const r = parseInt(hexColor.substring(1, 2), 16);
  const g = parseInt(hexColor.substring(3, 2), 16);
  const b = parseInt(hexColor.substring(5, 2), 16);

  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  return luminance > 0.5 ? 'black' : 'white';
}

export{getContrastColor};