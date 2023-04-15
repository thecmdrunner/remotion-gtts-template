/**
 * * Trying to use express server just like this template: https://github.com/remotion-dev/template-still
 * * You can also implement Rate limiting from it, if needed when deploying this project as a site.
 */

import express from 'express';
import {createTextToSpeechAudio} from './TextToSpeech';
import cors from 'cors';
import dotenv from 'dotenv';
import {FALLBACK_RANDOM_AUDIO} from './TextToSpeech/constants';
import {RequestMetadata, ServerResponse} from '../lib/interfaces';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5050;

app.use(express.json());
app.use(cors({origin: '*'}));

app.post(`/getdata`, async (req, res) => {
	try {
		const data = req.body as RequestMetadata;

		const audioURL = await createTextToSpeechAudio({...data});

		return res.json({url: audioURL} as ServerResponse).end();
	} catch (err) {
		console.error(err);
		return res.json({url: FALLBACK_RANDOM_AUDIO} as ServerResponse).end();
	}
});

app.listen(port, () => {
	console.log(`TTS server listening on ${port}`);
});
