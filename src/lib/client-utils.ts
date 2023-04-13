import {
	FALLBACK_RANDOM_AUDIO,
	SERVER_URL,
	voices,
} from '../server/TextToSpeech/constants';
import {ServerResponse} from './interfaces';

export const getTTSFromServer = async (
	text: string,
	voice: keyof typeof voices
): Promise<string> => {
	try {
		const result: ServerResponse = await (
			await fetch(SERVER_URL + `/getdata`, {
				method: 'POST',
				body: JSON.stringify({text, voice}),
				headers: {'Content-Type': 'application/json'},
			})
		).json();

		console.log(`DEBUG: You got result!!!!`);
		console.log(result);

		return result.url;
	} catch (err) {
		console.error(err);
		return FALLBACK_RANDOM_AUDIO;
	}
};
