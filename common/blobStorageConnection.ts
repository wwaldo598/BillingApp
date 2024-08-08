import  { BlobServiceClient, StorageSharedKeyCredential, ContainerClient }  from "@azure/storage-blob";

export function createBlobStorageConnection (containerName : string): ContainerClient{
    let containerClient : ContainerClient = null;
    try{
        const blobConnectionString = process.env ['AzureWebJobsStorage'].split (';');
        const accountName = blobConnectionString [1].split ('=')[1];
        const accountKey = blobConnectionString [2].split ('=')[2];
        const sharedKeyCredential = new StorageSharedKeyCredential (accountName, accountKey);

        const urlBlobContainer : string = `https://127.0.0.1:10000/${accountName}`;
        const blobServiceClient = new BlobServiceClient (urlBlobContainer, 
                                                         sharedKeyCredential
        );
        containerClient = blobServiceClient.getContainerClient (containerName);
    }catch (error){
        console.log ('Error', error);
    }
    return containerClient;
}
