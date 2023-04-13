/* eslint-disable camelcase */

import md5 from 'md5';
import {
	checkIfAudioHasAlreadyBeenSynthesized as isAudioAlreadySynthesized,
	createFirebaseUrl,
	uploadFileToFirebase,
} from '../lib/firebase/utils';
import {audioDirectoryInBucket} from './constants';
import textToSpeech from '@google-cloud/text-to-speech';

const voices = {
	enUSMan1: {name: 'en-US-Standard-D', languageCode: 'en-US'},
	enUSWoman1: {name: 'en-US-Standard-F', languageCode: 'en-US'},
} as const;

const client = new textToSpeech.TextToSpeechClient({
	credentials: {
		private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
		client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
		client_id: process.env.GOOGLE_CLOUD_CLIENT_ID,
	},
});

export const createTextToSpeechAudio = async (
	text: string,
	voice: keyof typeof voices
): Promise<string> => {
	if (!voices[voice]) throw new Error('Voice not found');
	const selectedVoice = voices[voice];

	const ssml = `
	<speak>
<emphasis level="strong"></emphasis>
<break time="200ms"/> or not to be, <break time="400ms"/>
<emphasis level="moderate">that</emphasis>
is the question.<break time="400ms"/>
Whether ‘tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,<break time="200ms"/>
Or to take arms against a sea of troubles
And by opposing end them.
</speak>`;

	/**
	 * * Determine directory name from SSML, directory in bucket, and voice name, to make a really unique fileName.
	 * * Not hashing anything but SSML makes refactoring easy in Firebase storage.
	 */
	const ssmlHash = md5(ssml);
	const filePathInBucket = `${audioDirectoryInBucket}/${selectedVoice.name}-${ssmlHash}.mp3`;

	// Return URL if already exists
	const fileExists = await isAudioAlreadySynthesized(filePathInBucket);
	if (fileExists) return createFirebaseUrl(filePathInBucket);

	// Create the TTS audio
	const [response] = await client.synthesizeSpeech({
		input: {ssml},
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
	const fileUploaded = await uploadFileToFirebase(
		response.audioContent as Uint8Array,
		filePathInBucket
	);

	const fullPathOfUploadedFile = fileUploaded.metadata.fullPath;

	return createFirebaseUrl(fullPathOfUploadedFile);
};
