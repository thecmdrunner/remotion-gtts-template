/* eslint-disable camelcase */

import md5 from 'md5';
import {
	checkIfAudioHasAlreadyBeenSynthesized as isAudioAlreadySynthesized,
	createFirebaseUrl,
	uploadFileToFirebase,
} from '../../lib/firebase/utils';
import {audioDirectoryInBucket, voices} from './constants';
import textToSpeech from '@google-cloud/text-to-speech';

const client = new textToSpeech.TextToSpeechClient();

export const createTextToSpeechAudio = async (
	text: string,
	voice: keyof typeof voices
): Promise<string> => {
	if (!voices[voice]) throw new Error('Voice not found');
	const selectedVoice = voices[voice];

	const ssml = `<speak><emphasis level="strong">${text}</emphasis></speak>`;

	/**
	 * * Determine directory name from SSML, directory in bucket, and voice name, to make a really unique fileName.
	 * * Only hashing the SSML makes it easy to find specific voice audios in Firebase storage.
	 */
	const ssmlHash = md5(ssml);
	const filePathInBucket = `${audioDirectoryInBucket}/${selectedVoice.name}-${ssmlHash}.mp3`;

	// Return URL if already exists
	const fileExists = await isAudioAlreadySynthesized(filePathInBucket);
	if (fileExists) return createFirebaseUrl(filePathInBucket);

	// Create the TTS audio
	const [response] = await client.synthesizeSpeech({
		input: {
			ssml,
		},
		voice: {
			name: selectedVoice.name,
			languageCode: selectedVoice.languageCode,
		},
		audioConfig: {
			audioEncoding: 'LINEAR16', // Higher quality than 'MP3'
			effectsProfileId: ['large-home-entertainment-class-device'], // Sounds better than small-devices
			pitch: 0,
			speakingRate: 1,
		},
	});
	// Upload the file to firebase
	const uploadedFile = await uploadFileToFirebase(
		response.audioContent as Uint8Array,
		filePathInBucket
	);

	const {fullPath} = uploadedFile.metadata;

	return createFirebaseUrl(fullPath);
};
