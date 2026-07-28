import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get Firestore Instance with custom database ID specified in config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
export default app;
