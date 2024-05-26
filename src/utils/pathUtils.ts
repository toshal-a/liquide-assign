// utils/pathUtils.ts

import { createPath } from './createPath';

export const calculatePaths = (points: number[]) => {
  const totalPoints = points.length;
  const points1 = points.slice(0, 4);
  const points2 = points.slice(3);

  const pathData1 = createPath(points1, totalPoints);
  const pathData2 = createPath(points2, totalPoints, points1.length - 1);

  return { pathData1, pathData2 };
};
