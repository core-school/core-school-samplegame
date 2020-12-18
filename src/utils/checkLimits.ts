import { Point } from "../types/Point";

export const checkLimits = (pos: Point) => {
  if (
    // Left & right screen limits
    pos.x < 500 &&
    pos.x > 0 &&
    // Up and down screen limits
    pos.y < 500 &&
    pos.y > 0
  ) {
    return true;
  }
  return false;
};
