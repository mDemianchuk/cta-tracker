import {CtaMapper} from "../mappers/cta-mapper";

export class ResponseProcessor {
    private constructor() {
    }

    static async process<T>(response: { [key: string]: any }, entityMapper: CtaMapper<T>, outerProperty: string, innerProperty: string): Promise<T[]> {
        return new Promise(resolve => {
            let entities: T[] = [];
            if (response.hasOwnProperty(outerProperty)) {
                let outerJson: { [key: string]: any } = response[outerProperty];
                if (outerJson.hasOwnProperty(innerProperty)) {
                    let innerJson: object[] = outerJson[innerProperty];
                    innerJson.forEach(entityJson => {
                        let entity = entityMapper.map(entityJson);
                        if (entity) {
                            entities.push(entity);
                        }
                    });
                }
            }
            resolve(entities);
        });
    }
}