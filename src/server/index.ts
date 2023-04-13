/**
 * * Perhaps could use express server instead?
 * * just like this template: https://github.com/remotion-dev/template-still
 */

// import dotenv from 'dotenv';
// import express from 'express';
// import rateLimit from 'express-rate-limit';
// import fs from 'fs';
// import os from 'os';
// import path from 'path';
// import md5 from 'md5';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 8000;

// const tmpDir = fs.promises.mkdtemp(path.join(os.tmpdir(), 'remotion-'));

// // This setting will reveal the real IP address of the user, so we can apply rate limiting.
// app.set('trust proxy', 1);

// // Not more than 20 requests per minute per user
// app.use(
// 	rateLimit({
// 		windowMs: 1 * 60 * 1000,
// 		max: 20,
// 	})
// );

// app.listen(port);
