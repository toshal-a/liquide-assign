import React, { useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { Line, Path, Svg } from 'react-native-svg';
import { COLORS } from '../utils/constants';
import { createPath } from '../utils/createPath';

const { width } = Dimensions.get('window');
const chartHeight = 200;
const graphWidth = width - 60;

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface AnimatedLineGraphProps {
  points: number[];
  secondPathColor: string;
}

const AnimatedLineGraph: React.FC<AnimatedLineGraphProps> = ({ points, secondPathColor }) => {
    const [pathData1, setPathData1] = useState('');
    const [pathData2, setPathData2] = useState('');

    const pathRef1 = useRef(null);
    const pathRef2 = useRef(null);
    const progress1 = useSharedValue(0);
    const progress2 = useSharedValue(0);
    const [pathLength1, setPathLength1] = useState(0);
    const [pathLength2, setPathLength2] = useState(0);

    useEffect(() => {
        const totalPoints = points.length;
        const points1 = points.slice(0, 4);
        const points2 = points.slice(3);

        const newPathData1 = createPath(points1, totalPoints);
        const newPathData2 = createPath(points2, totalPoints, points1.length - 1);

        let path1Changed = false;
        let path2Changed = false

        setPathData1((prevPathData) => {
            if (prevPathData !== newPathData1) {
                path1Changed = true;
            }
            return newPathData1
        });

        setPathData2((prevPathData) => {
            if (prevPathData !== newPathData2) {
                path2Changed = true;
            }
            return newPathData2;
        });

        animatePaths(path1Changed, path2Changed);
    }, [points]);

    const animatePaths = (path1Changed: boolean, path2Changed: boolean) => {
        if (path1Changed) {
            progress1.value = 0;
            progress2.value = 0;
            progress1.value = withTiming(1, { duration: 500 }, () => {
            progress2.value = withTiming(1, { duration: 500 });
            });
        } else if (path2Changed) {
            progress2.value = 0;
            progress2.value = withTiming(1, { duration: 500 });
        }
    };

    useEffect(() => {
        if (pathRef1.current) {
            const length = pathRef1.current.getTotalLength();
            setPathLength1(length);
        }
    }, [pathRef1.current, pathData1]);

    useEffect(() => {
        if (pathRef2.current) {
            const length = pathRef2.current.getTotalLength();
            setPathLength2(length);
        }
    }, [pathRef2.current, pathData2]);

    const animatedProps1 = useAnimatedProps(() => ({
        strokeDashoffset: pathLength1 * (1 - progress1.value),
    }));

    const animatedProps2 = useAnimatedProps(() => ({
        strokeDashoffset: pathLength2 * (1 - progress2.value),
    }));

    return (
        <Svg height={chartHeight} width={graphWidth}>
            <AnimatedPath
            ref={pathRef1}
            d={pathData1}
            stroke={COLORS.onPrimary}
            strokeWidth="2"
            fill="none"
            strokeDasharray={pathLength1}
            animatedProps={animatedProps1}
            />
            <AnimatedPath
            ref={pathRef2}
            d={pathData2}
            stroke={secondPathColor}
            strokeWidth="2"
            fill="none"
            strokeDasharray={pathLength2}
            animatedProps={animatedProps2}
            />
            <Line
            x1={graphWidth / 2}
            y1="0"
            x2={graphWidth / 2}
            y2={chartHeight}
            stroke={COLORS.divider}
            strokeWidth="2"
            />
        </Svg>
    );
};

export default AnimatedLineGraph;
