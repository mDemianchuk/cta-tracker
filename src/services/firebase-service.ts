import * as firebase from 'firebase/app';
import '@firebase/auth';
import UserCredential = firebase.auth.UserCredential;

export class FirebaseService {
    private readonly app: firebase.app.App;

    constructor() {
        this.app = firebase.initializeApp({
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            databaseURL: process.env.DB_URL,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MSG_SENDER_ID,
            appId: process.env.APP_ID
        });
    }

    async signUp(email: string, password: string): Promise<UserCredential> {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    async signIn(email: string, password: string): Promise<UserCredential> {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    async signOut(): Promise<void> {
        return firebase.auth().signOut();
    }

    isUserSignedIn(): boolean {
        return !!firebase.auth().currentUser;
    }

    isStopSaved(stopId: string): boolean {
        return false;
    }
}