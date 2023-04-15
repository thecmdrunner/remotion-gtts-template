import {interpolate, staticFile, z} from 'remotion';
import {useCallback, useEffect, useState} from 'react';
import {
	Audio,
	continueRender,
	delayRender,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {getTTSFromServer} from '../lib/client-utils';
import {RequestMetadata} from '../lib/interfaces';
import {FALLBACK_AUDIO_URL} from '../server/TextToSpeech/constants';

export const Text: React.FC<RequestMetadata> = (props) => {
	const {titleText, titleColor, pitch, speakingRate, voice, subtitleText} =
		props;
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const titleTextForAnimation = titleText.split(' ').map((t) => ` ${t} `);

	const [handle] = useState(() => delayRender());
	const [audioUrl, setAudioUrl] = useState('');

	function hasDataChanged(obj1: RequestMetadata, obj2: RequestMetadata) {
		// Check if both objects have the same number of keys
		if (Object.keys(obj1).length !== Object.keys(obj2).length) {
			return false;
		}

		// Loop through each key in obj1 and compare its value with obj2

		for (const key in obj1) {
			if (obj1[key as keyof typeof obj1] !== obj2[key as keyof typeof obj2])
				return false;
		}

		// All keys and values match
		return true;
	}

	const fetchTts = useCallback(async () => {
		/**
		 * * This is a possible workaround for avoiding too many requests to server.
		 */
		// Const previousData = getFromLocalStorage()
		// if (!hasDataChanged(previousData, props)) setAudioUrl(previousData.url)

		const url = await getTTSFromServer({...props});
		setAudioUrl(url);

		continueRender(handle);
	}, [handle, props]);

	useEffect(() => {
		fetchTts();
	}, [fetchTts, props]);

	return (
		<>
			{audioUrl ? (
				<Audio
					id="TTS Audio"
					about="TTS Audio"
					src={
						audioUrl === FALLBACK_AUDIO_URL
							? staticFile(FALLBACK_AUDIO_URL)
							: audioUrl
					}
				/>
			) : (
				<></>
			)}

			<h1
				style={{
					fontFamily: 'SF Pro Text, Helvetica, Arial',
					fontWeight: 'bold',
					fontSize: 110,
					textAlign: 'center',
					position: 'absolute',
					top: 160,
					width: '100%',
				}}
			>
				{titleTextForAnimation.map((t, i) => {
					return (
						<span
							key={t}
							style={{
								color: titleColor,
								marginLeft: 10,
								marginRight: 10,
								transform: `scale(${spring({
									fps: videoConfig.fps,
									frame: frame - i * 5,
									config: {
										damping: 100,
										stiffness: 200,
										mass: 0.5,
									},
								})})`,
								display: 'inline-block',
							}}
						>
							{t}
						</span>
					);
				})}
			</h1>

			<h2
				style={{
					opacity: interpolate(frame, [95, 100], [0.1, 1]),
					transform: `scale(${interpolate(frame, [95, 100], [0.9, 1], {
						extrapolateRight: 'clamp',
					})})`,
					fontFamily: 'SF Pro Text, Helvetica, Arial',
					fontWeight: 'bold',
					fontSize: 70,
					textAlign: 'center',
					position: 'absolute',
					bottom: 160,
					width: '100%',
					color: titleColor,
				}}
			>
				{subtitleText}
			</h2>
		</>
	);
};
