import { createBlobStorageConnection } from "../../common/blobStorageConnection";
import { InputRequest, InvoiceDBRecord } from "../../common/types";
import { ContainerName } from "../../common/config";
import { ContainerClient } from "@azure/storage-blob";
import { cosmosDBRepository } from "../repository/CosmosDBRepository";

/**
 * 
 * @param invoiceInfo 
 */
export async function ProcessInvoiceMetadata (inputRequest : InputRequest){

    try{
        console.log ('Request for processing:', inputRequest);
         
        console.log (' Getting connection to container:', inputRequest);

        /** 1. Getting connection to container */
        const containerClient : ContainerClient = createBlobStorageConnection (ContainerName);
        if (!containerClient){
            throw new Error ('Error connecting to BlogStorage'.concat (ContainerName));
        }
        console.log (' Getting connection to container - Ok');

        console.log ('Validating DB Connection');

        /** 2. Inserting invoice in the DB Connection */
        const invoiceDBRecord : InvoiceDBRecord = { billingDate : inputRequest.billingDate, 
                                                    invoiceInfo : inputRequest.invoiceInfo }; 
        cosmosDBRepository.insertInvoice (invoiceDBRecord);

    }catch(error){
        console.log ('Error', error);
        throw error;
    }

}

