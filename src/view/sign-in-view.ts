import {FirebaseService} from "../services/firebase-service";
import * as ons from "onsenui";

export class SignInView {
    private readonly firebaseService: FirebaseService;

    constructor(firebaseService: FirebaseService) {
        this.firebaseService = firebaseService;
    }

    init(): void {
        this.initSignIn();
    }

    private initSignIn(): void {
        const signInButton = document.querySelector('#sign-in-button') as ons.OnsButtonElement;
        signInButton.addEventListener('click', async () => {
            const username = (document.querySelector('#username') as ons.OnsInputElement).value as string;
            const password = (document.querySelector('#password') as ons.OnsInputElement).value as string;
            await this.firebaseService.signIn(username, password)
                .catch(() => console.log('failed to log in'));
        });
    }
}