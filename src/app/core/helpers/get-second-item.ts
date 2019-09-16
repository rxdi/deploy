import { isFunction } from 'util';

/**
 * Gets second item of the object without iterating all objects inside
 */
export function getSecondItem<T>(object: T) {
  if (!object) {
    return null;
  }
  let count = 0;
  let secondKey: string;
  for (const key in object) {
    if (count === 1) {
        secondKey = key;
        break;
    }
    count++;
  }
  if (!object[secondKey]) {
    throw new Error(`Missing method ${secondKey}`);
  }
  if (isFunction(object[secondKey])) {
    object = object[secondKey];
  }
  return object;
}
