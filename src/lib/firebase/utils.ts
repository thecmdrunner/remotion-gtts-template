import {getStorage, getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {app} from '.';

export const uploadFileToFirebase = async (
	audioData: Uint8Array | ArrayBuffer | Blob,
	filePath: string
) => {
	const storage = getStorage(app);

	// Make a reference for file to upload
	const storageRef = ref(storage, filePath);

	// Upload file
	const uploadedFile = await uploadBytes(storageRef, audioData);
	return uploadedFile;
};

export const createFirebaseUrl = async (fullPath: string): Promise<string> => {
	const storage = getStorage(app);

	// Return download URL
	const url = await getDownloadURL(ref(storage, fullPath));
	return url;
};

export const checkIfAudioHasAlreadyBeenSynthesized = async (
	filePath: string
) => {
	try {
		const storage = getStorage(app);

		// Return URL for download
		const url = await getDownloadURL(ref(storage, filePath));
		return url;
	} catch {
		return false;
	}
};
