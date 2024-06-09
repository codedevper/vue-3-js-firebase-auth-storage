//import { ref } from 'vue';
import { storage, auth } from '@/plugins/firebase';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';

export function useUploadAvatarImage() {
    const uploadAvatarImage = async (file) => {
        const text = file.type
        const type = text.replace("image/", "")
        const newFileName = `${auth.currentUser.uid}.${type}`;
        const storageReference = storageRef(storage, `avatar/${newFileName}`);
        await uploadBytes(storageReference, file);
        const downloadURL = await getDownloadURL(storageReference);
        return downloadURL;
    };

    return { uploadAvatarImage };
}