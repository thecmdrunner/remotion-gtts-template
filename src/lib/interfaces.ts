import {voices} from '../server/TextToSpeech/constants';

export interface ServerResponse {
	url: string;
}
export type VoiceType = keyof typeof voices;
