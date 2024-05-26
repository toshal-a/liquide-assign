import React, { useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming, runOnUI } from 'react-native-reanimated';
import { Line, Path, Svg } from 'react-native-svg';
import { COLORS } from '../utils/constants';
import useStateWithPrevious from '../hooks/useStateWithPrevious';

const { width } = Dimensions.get('window');
const chartHeight = 200;
const graphWidth = width - 60;

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface AnimatedLineGraphProps {
	initialPathData1: string;
	initialPathData2: string;
	secondPathColor: string;
}

const AnimatedLineGraph: React.FC<AnimatedLineGraphProps> = ({ initialPathData1, initialPathData2, secondPathColor }) => {
	const [pathData1, setPathData1, prevPathData1] = useStateWithPrevious(initialPathData1);
	const [pathData2, setPathData2, prevPathData2] = useStateWithPrevious(initialPathData2);

	const pathRef1 = useRef(null);
	const pathRef2 = useRef(null);
	const progress1 = useSharedValue(0);
	const progress2 = useSharedValue(0);
	const [pathLength1, setPathLength1] = useState(-1);
	const [pathLength2, setPathLength2] = useState(-1);
    const [animationStarted, setAnimationStarted] = useState(false);

	useEffect(() => {
		let path1Changed = initialPathData1 !== prevPathData1;
		let path2Changed = initialPathData2 !== prevPathData2;

		setPathData1(initialPathData1);
		setPathData2(initialPathData2);

        setAnimationStarted(true);
        if (path1Changed || path2Changed) {
            runOnUI(() => {
                animatePaths(path1Changed, path2Changed);
            })();
        }
	}, [initialPathData1, initialPathData2]);

	useEffect(() => {
		return () => {
            runOnUI(() => {
                progress1.value = 0;
                progress2.value = 0;
            })();
		}
	}, []);

	const animatePaths = (path1Changed: boolean, path2Changed: boolean) => {
		'worklet';
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
	}, [pathData1, pathRef1.current]);

	useEffect(() => {
		if (pathRef2.current) {		
            const length = pathRef2.current.getTotalLength();
            setPathLength2(length);
		}
	}, [pathData2, pathRef2.current]);

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
				stroke={animationStarted ? COLORS.onPrimary : COLORS.background}
				strokeWidth="2"
				fill="none"
				strokeDasharray={pathLength1}
				animatedProps={animatedProps1}
			/>
			<AnimatedPath
				ref={pathRef2}
				d={pathData2}
				stroke={animationStarted ? secondPathColor : COLORS.background}
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
