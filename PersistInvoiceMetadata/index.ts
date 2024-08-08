import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { requestHandler } from "./RequestHandler";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    await requestHandler.handlerRequest (context, req);
};

export default httpTrigger;