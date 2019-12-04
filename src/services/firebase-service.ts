import * as firebase from 'firebase/app';
import '@firebase/auth';
import 'firebase/firestore'
import {User} from "firebase";
import {PageHelper} from "../utils/page-helper";
import UserCredential = firebase.auth.UserCredential;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export class FirebaseService {

    constructor() {
        this.initApp();
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

    async isStopSaved(id: string, stopType: string): Promise<boolean> {
        const user: User | null = this.getCurrentUser();
        if (user) {
            return await firebase.firestore()
                .collection(`users/${user.uid}/${stopType}-stops`)
                .doc(id)
                .get()
                .then((doc: DocumentSnapshot) => doc.exists)
                .catch(() => Promise.resolve(false));
        }
        return Promise.reject('User is not logged in');
    }

    async saveStop(id: string, name: string, routeId: string | null, stopType: string): Promise<void> {
        const user: User | null = this.getCurrentUser();
        if (user) {
            return await firebase.firestore()
                .doc(`users/${user.uid}/${stopType}-stops/${id}`)
                .set({
                    id: id, name: name, routeId: routeId
                })
                .catch(() => Promise.reject('Error saving a bus stop'));
        }
        return Promise.reject('User is not logged in');
    }


    async deleteStop(id: string, stopType: string): Promise<void> {
        const user: User | null = this.getCurrentUser();
        if (user) {
            return await firebase.firestore()
                .doc(`users/${user.uid}/${stopType}-stops/${id}`)
                .delete()
                .catch(() => Promise.reject('Error saving a bus stop'));
        }
        return Promise.reject('User is not logged in');
    }

    private getCurrentUser(): User | null {
        return firebase.auth().currentUser;
    }

    private initApp(): void {
        firebase.initializeApp({
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            databaseURL: process.env.DB_URL,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MSG_SENDER_ID,
            appId: process.env.APP_ID
        });
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