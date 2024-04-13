import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  let photo, user;

  try {
    photo = await uploadPhoto();
  } catch (error) {
    console.error('uploadPhoto error:', error);
    photo = null;
  }

  try {
    user = await createUser();
  } catch (error) {
    console.error('createUser error:', error);
    user = null;
  }

  return { photo, user };
}
