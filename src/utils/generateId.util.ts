import { v4 as uuidv4 } from 'uuid';

export const generateUniqueId = (letter: number) =>
  uuidv4()
    .replace(/-/g, '')
    .slice(0, letter || 3);
