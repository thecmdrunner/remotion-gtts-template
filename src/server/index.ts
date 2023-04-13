/**
 * * Trying to use express server just like this template: https://github.com/remotion-dev/template-still
 */

import express from 'express';
import rateLimit from 'express-rate-limit';
import {createTextToSpeechAudio} from './TextToSpeech';
import cors from 'cors';
import dotenv from 'dotenv';
import {FALLBACK_RANDOM_AUDIO} from './TextToSpeech/constants';
import {ServerResponse} from '../lib/interfaces';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5050;

// This setting will reveal the real IP address of the user, so we can apply rate limiting.
app.set('trust proxy', 1);

app.use(express.json());
app.use(cors({origin: '*'}));

// Not more than 60 requests per minute per user
app.use(rateLimit({windowMs: 1 * 60 * 1000, max: 60}));

app.post(`/getdata`, async (req, res) => {
	try {
		const {text, voice} = req.body;

		const audioURL = await createTextToSpeechAudio(text, voice);

		return res.json({url: audioURL} as ServerResponse).end();
	} catch (err) {
		console.error(err);
		return res.json({url: FALLBACK_RANDOM_AUDIO} as ServerResponse).end();
	}
});

app.listen(port, () => {
	console.log(`TTS server listening on ${port}`);
});
