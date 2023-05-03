import {Composition} from 'remotion';
import {HelloWorld, mySchema} from './HelloWorld';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export const RemotionRoot: React.FC = () => {
	if (!process.env.GOOGLE_APPLICATION_CREDENTIALS)
		throw new Error(
			'GOOGLE_APPLICATION_CREDENTIALS environment variable is missing. Read the instructions in README.md file and complete the setup.'
		);

	if (!process.env.FIREBASE_API_KEY)
		throw new Error(
			'FIREBASE_API_KEY environment variable is missing. Read the instructions in README.md file and complete the setup.'
		);
	if (!process.env.FIREBASE_AUTH_DOMAIN)
		throw new Error(
			'FIREBASE_AUTH_DOMAIN environment variable is missing. Read the instructions in README.md file and complete the setup.'
		);

	if (!process.env.FIREBASE_PROJECT_ID)
		throw new Error(
			'FIREBASE_PROJECT_ID environment variable is missing. Read the instructions in README.md file and complete the setup.'
		);
	if (!process.env.FIREBASE_STORAGE_BUCKET)
		throw new Error(
			'FIREBASE_STORAGE_BUCKET environment variable is missing. Read the instructions in README.md file and complete the setup.'
		);

	if (!process.env.FIREBASE_MESSAGING_SENDER_ID)
		throw new Error(
			'FIREBASE_MESSAGING_SENDER_ID environment variable is missing. Read the instructions in README.md file and complete the setup.'
		);

	if (!process.env.FIREBASE_APP_ID)
		throw new Error(
			'FIREBASE_APP_ID environment variable is missing. Read the instructions in README.md file and complete the setup.'
		);

	// Create a React Query client to wrap all compositions with.
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Composition
				id="HelloWorld"
				schema={mySchema}
				component={HelloWorld}
				durationInFrames={300}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText:
						'Text to speech on Remotion using  Google Cloud and Firebase!' as const,
					subtitleText:
						'With these powerful tools, what will you build?' as const,
					titleColor: '#2E8AEA' as const,
					voice: 'Woman 1 (US)' as const,
					pitch: 0,
					speakingRate: 1,
				}}
			/>
		</QueryClientProvider>
	);
};
