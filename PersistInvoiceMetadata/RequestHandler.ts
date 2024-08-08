import { Context, HttpRequest } from "@azure/functions";
import { constants as httpStatus } from "http2"; 
import { InfoMetadata, ResponseStatus, InputRequest } from "../common/types";
import { createResponseMessage } from "../common/utils/responseMessage";
import { ProcessInvoiceMetadata } from "./services/ProcessInvoiceMetadata";

class RequestHandler{

    async handlerRequest (httpContext: Context, request : HttpRequest): Promise<void>{
        let response : ResponseStatus = { status : httpStatus.HTTP_STATUS_OK, message: "Success"};
        let infoMetadata : InfoMetadata = { transactionId : "", applicationId : ""};
        try {
            const inputRequest : InputRequest = request.body;
            infoMetadata = inputRequest.inputMetada;
            await ProcessInvoiceMetadata (inputRequest);
        }catch(error){
            console.error ('Error:', error);
            response.status =  httpStatus.HTTP_STATUS_INTERNAL_SERVER_ERROR;
            response.message = 'Internal Server Error';
        }
        httpContext.res = createResponseMessage (response, infoMetadata);
    }

}

export const requestHandler = new RequestHandler();