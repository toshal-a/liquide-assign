import * as d3 from 'd3-shape';
import { Dimensions } from 'react-native';

const chartHeight = 200;
const graphWidth = Dimensions.get('window').width - 60;

interface Point {
  x: number;
  y: number;
}

export const createPath = (points: number[], totalPoints: number, startIndex = 0): string => {
  const step = graphWidth / (totalPoints - 2);
  const maxValue = 50;
  const heightRatio = chartHeight / maxValue;

  const formattedPoints: Point[] = points.map((point, index) => ({
    x: step * (index + startIndex),
    y: chartHeight - point * heightRatio,
  }));

  const lineGenerator = d3.line<Point>()
    .x(d => d.x)
    .y(d => d.y)
    .curve(d3.curveCatmullRom.alpha(0)); // Using Catmull-Rom curve for smoothness

  return lineGenerator(formattedPoints) || '';
};
