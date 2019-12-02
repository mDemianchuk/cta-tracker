import * as firebase from 'firebase/app';

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

    getApp(): firebase.app.App {
        return this.app;
    }
}