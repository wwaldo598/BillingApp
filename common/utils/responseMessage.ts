import { InfoMetadata, ResponseStatus } from "../types";

/**
 * 
 * @param responseStatus 
 * @param infoMetadata 
 */
export function createResponseMessage (responseStatus: ResponseStatus, 
                                       infoMetadata: InfoMetadata){
    return {
        body: {
            outputMetada: infoMetadata,
            response: responseStatus
        },
        status: responseStatus.status,
        headers:{
            'Content-Type': 'application/json'
        }
    }
}