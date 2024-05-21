// Takes a list of authors and returns a string with the authors' names
export const generateAuthorNames = (authors: string[]): string => {
    
    if (authors.length === 0) return "";
    if (authors.length === 1) return authors[0];
    return authors.slice(0, -1).join(', ') + ' and ' + authors[authors.length - 1];
  }