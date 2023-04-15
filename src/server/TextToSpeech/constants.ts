import {staticFile} from 'remotion';

export const FIREBASE_BUCKET_NAME = process.env.FIREBASE_BUCKET_NAME || '';

export const SERVER_URL = `http://localhost:${process.env.SERVER_PORT || 5050}`;
export const audioDirectoryInBucket = 'remotion-gtts';

export const FALLBACK_AUDIO_URL = staticFile('error_audio.mp3');

export const voices = {
	'Man 1 (US)': {name: 'en-US-Neural2-D', languageCode: 'en-US'},
	'Man 2 (US)': {name: 'en-US-Neural2-J', languageCode: 'en-US'},
	'Woman 1 (US)': {name: 'en-US-Neural2-H', languageCode: 'en-US'},
	'Woman 2 (US)': {name: 'en-US-Neural2-F', languageCode: 'en-US'},
};
