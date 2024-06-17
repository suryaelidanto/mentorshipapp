export function truncateString(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str;
  } else {
    const truncatedStr = str.substr(0, maxLength);
    const lastSpaceIndex = truncatedStr.lastIndexOf(" ");
    return truncatedStr.substr(0, lastSpaceIndex) + "...";
  }
}
