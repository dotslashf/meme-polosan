import { Navigation } from "./types";

export const cn = (...args: string[]): string => args.filter(Boolean).join(" ");

export const checkRoutePaths = (
  path: string,
  paths: Navigation[]
): Navigation[] => {
  return paths.map((pathItem) => {
    if (path === pathItem.href) {
      pathItem.current = true;
    }
    return pathItem;
  });
};
