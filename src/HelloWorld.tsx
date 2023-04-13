import {
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
	z,
	zColor,
} from 'remotion';
import {Title} from './HelloWorld/Title';
import {voices} from './server/TextToSpeech/constants';
import {VoiceType} from './lib/interfaces';

export const mySchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
	voice: z.enum(
		Object.keys(voices) as [keyof typeof voices] | [VoiceType, ...VoiceType[]]
	),
	// Voice: z.enum(Object.keys(voices)),
	// voice: z.enum([...Object.keys(voices)]),
	// Voice: z.enum(['enUSMan1', 'enUSMan2', 'enUSWoman1', 'enUSWoman2']),
});

export const HelloWorld: React.FC<z.infer<typeof mySchema>> = (props) => {
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
					<Title {...props} />
				</Sequence>
			</div>
		</div>
	);
};
