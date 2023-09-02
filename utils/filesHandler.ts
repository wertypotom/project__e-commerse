import { UploadTask, getDownloadURL } from 'firebase/storage';

export const getUniqueFilename = (file: File) => {
  const timeString = Date.now();
  const randomNumberString = Math.random().toString(36).substring(2, 12);

  return `${file.name}-${timeString}-${randomNumberString}`;
};

export const extractImageUrlFirebase = async (
  uploadImage: UploadTask
): Promise<string> => {
  return new Promise((resolve, reject) => {
    uploadImage.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
};
