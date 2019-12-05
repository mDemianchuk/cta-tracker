import * as firebase from 'firebase/app';
import '@firebase/auth';
import 'firebase/database'
import {User} from "firebase";
import {PageHelper} from "../utils/page-helper";
import UserCredential = firebase.auth.UserCredential;
import DataSnapshot = firebase.database.DataSnapshot;
import {FavoriteStop} from "../models/favorite-stop";
import {FavoriteStopView} from "../view/favorite-stop-view";

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

    async getStopsByType(stopType: string): Promise<FavoriteStop[]> {
        const user: User | null = this.getCurrentUser();
        if (user) {
            return await firebase.database()
                .ref(`users/${user.uid}/${stopType}-stops/`)
                .once('value')
                .then((snapshot: DataSnapshot) => Object.values(snapshot.val()) as FavoriteStop[])
                .catch(() => Promise.resolve([]));
        }
        return Promise.reject('User is not logged in');
    }

    async isStopSaved(stopId: string, stopType: string): Promise<boolean> {
        const user: User | null = this.getCurrentUser();
        if (user) {
            return await firebase.database()
                .ref(`users/${user.uid}/${stopType}-stops/${stopId}`)
                .once('value')
                .then((snapshot: DataSnapshot) => snapshot.exists())
                .catch(() => Promise.resolve(false));
        }
        return Promise.reject('User is not logged in');
    }

    async saveStop(stopToBeSaved: FavoriteStop, stopType: string): Promise<void> {
        const user: User | null = this.getCurrentUser();
        if (user) {
            return await firebase.database()
                .ref(`users/${user.uid}/${stopType}-stops/${stopToBeSaved.id}`)
                .set(stopToBeSaved)
                .catch(() => Promise.reject('Error saving a bus stop'));
        }
        return Promise.reject('User is not logged in');
    }

    async deleteStop(stopId: string, stopType: string): Promise<void> {
        const user: User | null = this.getCurrentUser();
        if (user) {
            return await firebase.database()
                .ref(`users/${user.uid}/${stopType}-stops/${stopId}`)
                .remove()
                .catch(() => Promise.reject('Error saving a stop'));
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
                await PageHelper.replacePage('html/sign-in.html', '#favorite-navigator');
            } else {
                firebase.database()
                    .ref(`users/${user.uid}/`)
                    .on('value', async () => {
                        let stops = await this.getStopsByType('train');
                        stops = stops.concat(await this.getStopsByType('bus'));
                        FavoriteStopView.renderStops(stops);
                    });
                await PageHelper.replacePage('html/favorite-stop.html', '#favorite-navigator')
            }
        });
    }
}