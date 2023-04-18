import {FALLBACK_AUDIO_URL, SERVER_URL} from '../server/TextToSpeech/constants';
import {RequestMetadata, ServerResponse} from './interfaces';

export const getTTSFromServer = async (
	props: RequestMetadata
): Promise<string> => {
	try {
		const result: ServerResponse = await (
			await fetch(SERVER_URL + `/getdata`, {
				method: 'POST',
				body: JSON.stringify(props),
				headers: {'Content-Type': 'application/json'},
			})
		).json();

		return result.url;
	} catch (err) {
		console.error(err);
		return FALLBACK_AUDIO_URL;
	}
};
