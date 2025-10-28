//import db from '@react-native-firebase/firestore';
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { app } from '../firebaseConfig'; // your Firebase app

const db = getFirestore(app);

export const addFamilyPost = async (userId, text, imageUrl) => {
  try {
    const postRef = await addDoc(collection(db, 'familyPosts'), {
      userId,
      text,
      imageUrl,
      createdAt: serverTimestamp(),
    });
    console.log('Family post added with ID:', postRef.id);
    return { status: true, data: { id: postRef.id, userId, text, imageUrl } };
  } catch (error) {
    console.log('Firestore error:', error);
    return { status: false, error: error.message };
  }
};

export const getFamilyPosts = async () => {
  try {
    const postsQuery = query(collection(db, 'familyPosts'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(postsQuery);
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { status: true, data: posts };
  } catch (error) {
    console.log('Firestore error: ', error);
    return { status: false, error: error.message };
  }
};

export const updateFamilyPost = async (postId, updatedData) => {
  try {
    await updateDoc(doc(db, 'familyPosts', postId), updatedData);
    return { status: true };
  } catch (error) {
    console.log('Firestore error: ', error);
    return { status: false, error: error.message };
  }
};

export const deleteFamilyPost = async (postId) => {
  try {
    await deleteDoc(doc(db, 'familyPosts', postId));
    return { status: true };
  } catch (error) {
    console.log('Firestore error: ', error);
    return { status: false, error: error.message };
  }
};

export const subscribeToFamilyPosts = (setPosts) => {
  const postsQuery = query(collection(db, 'familyPosts'), orderBy('createdAt', 'desc'));
  return onSnapshot(postsQuery, (snapshot) => {
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(posts);
  });
};