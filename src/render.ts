import {bundle} from '@remotion/bundler';
import {renderMedia, getCompositions} from '@remotion/renderer';
import {AnySmallCompMetadata} from 'remotion';
import {startServer} from './server/server';

export const render = async () => {
	const server = startServer();
	const serveUrl = await bundle({
		entryPoint: 'src/index.ts',
		enableCaching: true,
	});

	const compositions = await getCompositions(serveUrl);

	await renderMedia({
		serveUrl,
		composition: compositions.find(
			(c) => c.id === 'HelloWorld'
		) as AnySmallCompMetadata,
		codec: 'h264',
		onProgress: (progress) => {
			console.log('Rendering progress:', progress);
		},
	});

	console.log('Finished rendering');
	return server.close();
};

render()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
