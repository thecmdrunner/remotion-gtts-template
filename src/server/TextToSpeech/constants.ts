export const FIREBASE_BUCKET_NAME = process.env.FIREBASE_BUCKET_NAME || '';

export const SERVER_URL = `http://localhost:${process.env.SERVER_PORT || 5050}`;
export const audioDirectoryInBucket = 'remotion-gtts';

export const FALLBACK_RANDOM_AUDIO =
	// Anything random for now
	'https://firebasestorage.googleapis.com/v0/b/tts-testing-prod/o/bvgpt%2FMarks-%26-Logos-cb739e1ee69b%2Fen-IN-Wavenet-A-21ebb464c234d185293f3300ef09ec18.mp3?alt=media&token=0635adee-e71a-4c20-a820-e27274e3941e';

export const voices = {
	enUSMan1: {name: 'en-US-Neural2-D', languageCode: 'en-US'},
	enUSMan2: {name: 'en-US-Neural2-J', languageCode: 'en-US'},
	enUSWoman1: {name: 'en-US-Neural2-H', languageCode: 'en-US'},
	enUSWoman2: {name: 'en-US-Neural2-F', languageCode: 'en-US'},
};
