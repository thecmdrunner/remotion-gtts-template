import {z} from 'zod';
import {mySchema} from '../HelloWorld';
import {voices} from '../server/TextToSpeech/constants';

export interface ServerResponse {
	url: string;
}
export type VoiceType = keyof typeof voices;
export type RequestMetadata = z.infer<typeof mySchema>;
