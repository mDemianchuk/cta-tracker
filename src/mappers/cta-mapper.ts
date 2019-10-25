export interface CtaMapper<T> {
    map(json: { [key: string]: any }): T | undefined;
    isValid(json: { [key: string]: any }): boolean;
}