import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase.config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Erreur d'authentification Google:", error);
    throw error;
  }
};
