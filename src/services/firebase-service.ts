import * as firebase from 'firebase/app';
import '@firebase/auth';
import UserCredential = firebase.auth.UserCredential;
import {User} from "firebase";
import {PageHelper} from "../utils/page-helper";

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
        this.initOnAuthStateChanged();
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
        return this.isUserSignedIn();
    }

    private initOnAuthStateChanged(): void {
        firebase.auth().onAuthStateChanged(async (user: User) => {
            if (!user) {
                console.log('not signed in');
                await PageHelper.replacePage('html/sign-in.html', '#favorite-navigator');
            } else {
                console.log('singed in');
                await PageHelper.replacePage('html/favorite-stop.html', '#favorite-navigator');
            }
        });
    }
}