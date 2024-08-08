import { Container, CosmosClient, Database }  from '@azure/cosmos';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const connectionDB = process.env ['COSMOS_DB_CONN_STR'].split(';');
const endpoint = connectionDB[0].split('=')[1];
const key = connectionDB[1].split('=')[1];
const dbName = process.env ['COSMOS_DB_ID'];

const client:CosmosClient = new CosmosClient ({endpoint, key});
const database: Database = client.database(dbName);

export function createDBContainerConnection (containerName: string):Container{
    return database.container (containerName); 
}