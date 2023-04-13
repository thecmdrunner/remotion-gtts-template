import {
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
	z,
	zColor,
} from 'remotion';
import {Title} from './HelloWorld/Title';

export const mySchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
});

export const HelloWorld: React.FC<z.infer<typeof mySchema>> = ({
	titleText,
	titleColor,
}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const opacity = interpolate(
		frame,
		[videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);
	const transitionStart = 25;

	return (
		<div style={{flex: 1, backgroundColor: 'white'}}>
			<div style={{opacity}}>
				<Sequence from={transitionStart + 10}>
					<Title titleText={titleText} titleColor={titleColor} />
				</Sequence>
			</div>
		</div>
	);
};
