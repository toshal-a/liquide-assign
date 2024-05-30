import React, { useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming, runOnUI } from 'react-native-reanimated';
import { Line, Path, Svg } from 'react-native-svg';
import { COLORS } from '../utils/constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const { width } = Dimensions.get('window');
const chartHeight = 200;
const graphWidth = width - 60;

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface AnimatedLineGraphProps {
	pathData1: string;
	pathData2: string;
	secondPathColor: string;
	path1Changed: boolean;
	path2Changed: boolean;
}

const AnimatedLineGraph: React.FC<AnimatedLineGraphProps> = ({ 
	pathData1,
	pathData2,
	secondPathColor,
	path1Changed,
	path2Changed,
}) => {
	const pathRef1 = useRef<SVGPathElement>(null);
	const pathRef2 = useRef<SVGPathElement>(null);
	const progress1 = useSharedValue(0);
	const progress2 = useSharedValue(0);
	const [pathLength1, setPathLength1] = useState<number>(0);
	const [pathLength2, setPathLength2] = useState<number>(0);
	const [animationStarted, setAnimationStarted] = useState<boolean>(false);

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
		if (path1Changed || path2Changed) {
            runOnUI(() => {
                animatePaths(path1Changed, path2Changed);
            })();
			setAnimationStarted(true);
		}
	}, [path1Changed, path2Changed, pathData1, pathData2]);

	useEffect(() => {
		return () => {
            runOnUI(() => {
                progress1.value = 0;
                progress2.value = 0;
            })();
			setAnimationStarted(false);
		}
	}, []);

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
				stroke={animationStarted ? COLORS.onPrimary : Colors.background}
				strokeWidth="2"
				fill="none"
				strokeDasharray={pathLength1}
				animatedProps={animatedProps1}
			/>
			<AnimatedPath
				ref={pathRef2}
				d={pathData2}
				stroke={animationStarted ? secondPathColor : Colors.background}
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
