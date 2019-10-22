import fetch from "node-fetch";

export class FetchHelper {

    private constructor() {
    }

    public static async fetch(url: URL): Promise<object> {
        return fetch(url)
            .then(response => response.json())
            .catch(err => console.error('Error during fetching the url', err));
    }
}