import { createDBContainerConnection } from "../../common/dbConnection";
import { DBCollectionName } from "../../common/config";
import { InvoiceDBRecord } from "../../common/types";

const container = createDBContainerConnection (DBCollectionName);

class CosmosDBRepository{

    /**
     * 
     * @param invoiceDBRecord  Data correspondig to the invoice.
     * 
     * @returns A null value if the records doesn't exist, but the found record.
     */
    public async findInvoice (invoiceDBRecord: InvoiceDBRecord): Promise<InvoiceDBRecord>{
        let record : InvoiceDBRecord = null;
        try{
            const sqlDB : string = "SELECT c.id, c.billingDate, c.invoiceInfo " + 
                                   "FROM InvoiceCU c " + 
                                   "WHERE c.invoiceInfo.id = @invoiceId";
            const querySpec = {
                query: sqlDB,
                parameters: [{
                    name : "@invoiceId",
                    value : invoiceDBRecord.invoiceInfo.id
                }]
            };
            const  { resources : results } = await container.items.query (querySpec).fetchAll();
            if (results.length > 1){
                throw Error ("More than 1 item found matching");
            }else if (results.length != 0){
                record = results [0];
            }
        }catch(error){
            console.error ("Error - findInvoice:", error);
            throw error;
        }
        return record;
    }

    /**
     * 
     * @param invoiceDBRecord Data correspondig to the invoice.
     */
    public async insertInvoice (invoiceDBRecord: InvoiceDBRecord){
        try{
            console.log ("Inserting invoice in the DB collection");
            const record : InvoiceDBRecord = await this.findInvoice(invoiceDBRecord);
            console.log ("Record to insert:", invoiceDBRecord);
            if (record != null){
                record.invoiceInfo = invoiceDBRecord.invoiceInfo;
                record.billingDate = invoiceDBRecord.billingDate;
                await container.items.upsert (record);
            }else{
                await container.items.create (invoiceDBRecord);
            }
            console.log ("Inserting invoice in the DB collection. OK");    
        }catch (error){
            console.error ("Error - insertInvoice:", error);
            throw error;
        }
    }

    /**
     * 
     * @returns A true value if the DB connection is OK; false, it there's no connection.
     */
    public validateConnection():boolean{
        let status : boolean = false;
        try{
            console.log ("Validating connection.");
            if (container){
                status = true;
            }
            console.log ("Validating connection. Is Ok? [" +  status + "]");
        }catch (error){
            console.error ("Error - validateConnection:", error);
        }
        return status;
    }
    
}

export const cosmosDBRepository = new CosmosDBRepository();
