export class FetchHelper {
    private constructor() {
    }

    static async fetch<T>(url: URL): Promise<T> {
        return fetch(url.toString())
            .then(response => response.json())
            .catch(err => console.error('Error during fetching the url', err));
    }
}